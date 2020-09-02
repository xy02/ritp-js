import { merge, Observable, BehaviorSubject, Subject, of, combineLatest, throwError } from 'rxjs'
import { map, scan, ignoreElements, tap, withLatestFrom, flatMap, take, takeUntil, shareReplay, groupBy, skip, filter, find, share, last, finalize, catchError, endWith, startWith, distinctUntilChanged } from "rxjs/operators";
import { ritp } from "./pb";

export interface Connection {
    buffers: Observable<Uint8Array>
    output: (bufs: Observable<Uint8Array>) => void
    onUnsubscribe: Observable<void>
}

export interface Peer {
    remoteInfo: ritp.IPeerInfo
    //创建stream
    stream: (request: ritp.IRequest) => Stream
    //注册stream处理路径
    register: (path: string) => Observable<StreamRequest>
}

export interface Stream {
    pulls: Observable<number>
    sendableAmounts: Observable<number>
    isSendable: Observable<boolean>
    outputBufs: (bufs: Observable<Uint8Array>) => void
}

export interface StreamRequest {
    request: ritp.IRequest
    bufs: Observable<Uint8Array>
    outputPulls: (pulls: Observable<number>) => void
}

export const h5WsConnection = (url: string) => new Observable<Connection>(s => {
    const ws = new WebSocket(url, 'ritp')
    ws.binaryType = "arraybuffer"
    ws.onclose = function (ev) {
        s.error(ev.reason)
    }
    const buffers = new Observable<Uint8Array>(s2 => {
        const cb = (ev: MessageEvent) => {
            const buf = new Uint8Array(ev.data)
            // console.info("received:", buf)
            s2.next(buf)
        }
        ws.addEventListener("message", cb)
        return () => {
            ws.removeEventListener("message", cb)
        }
    })
    const outputs = new Subject<Observable<Uint8Array>>()
    const outputCb = (output: Observable<Uint8Array>) => {
        outputs.next(output)
    }
    const sub = outputs.pipe(
        flatMap(output => output),
    ).subscribe(
        buf => ws.send(buf),
        err => ws.close(4000, err.toString()),
        () => ws.close()
    )
    const onUnsubscribe = new Subject<void>()
    ws.onopen = function (ev) {
        s.next({
            buffers,
            output: outputCb,
            onUnsubscribe,
        })
    }
    return () => {
        onUnsubscribe.next()
        onUnsubscribe.complete()
        sub.unsubscribe()
        ws.close()
    }
})

//初始化Peer
export const init = (connection: Observable<Connection>, myInfo: ritp.IPeerInfo): Observable<Peer> => connection.pipe(
    tap(({ output, onUnsubscribe }) => {
        onUnsubscribe.subscribe(() => {
            output(of(ritp.Frame.encode({ disconnect: {} }).finish()))
        })
        output(of(ritp.PeerInfo.encode(myInfo).finish()))
    }),
    flatMap(({ buffers, output }) => buffers.pipe(
        take(1),
        map(buf => ritp.PeerInfo.decode(buf)),
        map(remoteInfo => {
            const groupedFramesByType = buffers.pipe(
                map(buf => ritp.Frame.decode(buf)),
                groupBy(frame => frame.type),
                shareReplay(),
            )
            const groupedEventsByType = groupedFramesByType.pipe(
                find(group => group.key == "event"),
                flatMap(group => group),
                map(frame => frame.event as ritp.Event),
                groupBy(event => event.type),
                shareReplay(),
            )
            const groupedCloseEventsByStreamId = groupedEventsByType.pipe(
                find(group => group.key == "close"),
                flatMap(group => group),
                groupBy(event => event.streamId),
                shareReplay(),
            )
            const groupedPullEventsByStreamId = groupedEventsByType.pipe(
                find(group => group.key == "pull"),
                flatMap(group => group),
                groupBy(event => event.streamId),
                shareReplay(),
            )
            // const streamIdSubject = new BehaviorSubject<number>(0)
            // const newStreamId = streamIdSubject.pipe(
            //     take(1),
            //     tap(x => streamIdSubject.next(x + 1)),
            // )
            let sid = 0
            const newStreamId = () => sid++
            const stream = (request: ritp.IRequest): Stream => {
                const streamId = newStreamId()
                const remoteClose = groupedCloseEventsByStreamId.pipe(
                    find(group => group.key == streamId),
                    flatMap(group => group),
                    take(1),
                    flatMap(ev => throwError(ev.close)),
                )
                const pulls = groupedPullEventsByStreamId.pipe(
                    find(group => group.key == streamId),
                    flatMap(group => group),
                    map(ev => ev.pull),
                    share(),
                )
                const sends = new BehaviorSubject<number>(0)
                const sendableAmounts = merge(pulls, sends).pipe(
                    scan((acc, num) => acc + num, 0),
                    shareReplay(1),
                    takeUntil(remoteClose),
                )
                const isSendable = sendableAmounts.pipe(
                    map(amount => amount > 0),
                    distinctUntilChanged(),
                    shareReplay(1),
                )
                const outputBufs = (bufs: Observable<Uint8Array>) => output(
                    bufs.pipe(
                        takeUntil(remoteClose),
                        withLatestFrom(isSendable),
                        filter(([_, sendable]) => sendable),
                        tap(() => sends.next(-1)),
                        map(([buf, _]) => ({ streamId, buf })),
                        startWith({ streamId, request }),
                        endWith({ streamId, end: { reason: ritp.End.Reason.COMPLETE } }),
                        catchError(err => of({ streamId, end: { reason: ritp.End.Reason.CANCEL, message: err.message } })),
                        map(event => ritp.Frame.encode({ event }).finish()),
                    )
                )
                return { pulls, sendableAmounts, outputBufs, isSendable }
            }
            const groupedEndEventsByStreamId = groupedEventsByType.pipe(
                find(group => group.key == "end"),
                flatMap(group => group),
                groupBy(event => event.streamId),
                shareReplay(),
            )
            const groupedBufEventsByStreamId = groupedEventsByType.pipe(
                find(group => group.key == "buf"),
                flatMap(group => group),
                groupBy(event => event.streamId),
                shareReplay(),
            )
            const streamRequests = groupedEventsByType.pipe(
                find(group => group.key == "request"),
                flatMap(group => group),
                map(event => {
                    const streamId = event.streamId
                    const request = event.request
                    const theEnd = groupedEndEventsByStreamId.pipe(
                        find(group => group.key == streamId),
                        flatMap(group => group),
                        take(1),
                        flatMap(ev => ev.end.reason != ritp.End.Reason.COMPLETE ? throwError(ev.end) : of(ev.end)),
                    )
                    //需要验证buf的数量
                    const bufs = groupedBufEventsByStreamId.pipe(
                        find(group => group.key == streamId),
                        flatMap(group => group),
                        map(ev => ev.buf),
                        takeUntil(theEnd),
                    )
                    const outputPulls = (pulls: Observable<number>) => output(
                        pulls.pipe(
                            map(pull => ({ streamId, pull })),
                            map(event => ritp.Frame.encode({ event }).finish()),
                        )
                    )
                    const path = request.path
                    return { path, request, bufs, outputPulls }
                })
            )
            const groupedStreamRequestsByPath = streamRequests.pipe(
                groupBy(sq => sq.path),
            )
            const register = (path: string): Observable<StreamRequest> => groupedStreamRequestsByPath.pipe(
                find(group => group.key == path),
                flatMap(group => group),
            )
            return {
                remoteInfo,
                stream,
                register,
            }
        }),
    )),
)
