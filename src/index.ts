import { merge, Observable, BehaviorSubject, Subject, of, combineLatest, throwError } from 'rxjs'
import { map, scan, ignoreElements, tap, withLatestFrom, flatMap, take, takeUntil, shareReplay, groupBy, skip, filter, find, share, last, finalize, catchError, endWith, startWith, distinctUntilChanged } from "rxjs/operators";
import { ritp } from "./pb";

type Output = (bufs: Observable<Uint8Array>) => void

export interface Connector {
    (onUnsubscribe: (output: Output) => void): Observable<Connection>
}

export interface Connection {
    receiver: Observable<Uint8Array>
    // sender: Subject<Uint8Array>
    output: (bufs: Observable<Uint8Array>) => void
}

export interface Peer {
    remoteInfo: ritp.IPeerInfo
    //创建stream
    stream: (request: ritp.IRequest) => Stream
    //注册stream处理路径
    register: (path: string) => Observable<StreamRequest>
    // data: Observable<ritp.IData>
    // controls: Observable<ritp.IControl>
    // outputEvents: (events: Observable<ritp.IEvent>) => void
    // outputControls: (controls: Observable<ritp.IControl>) => void
}

export interface Stream {
    sendableAmounts: Observable<number>
    isSendable: Observable<boolean>
    outputBufs: (bufs: Observable<Uint8Array>) => void
}

export interface StreamRequest {
    request: ritp.IRequest
    bufs: Observable<Uint8Array>
    outputPulls: (pulls: Observable<number>) => void
}

export const h5WsConnector = (url: string) => (onUnsubscribe: (output: Output) => void) =>
    new Observable<Connection>(s => {
        const ws = new WebSocket(url, 'ritp')
        ws.binaryType = "arraybuffer"
        ws.onclose = function (ev) {
            s.error(ev.reason)
        }
        const receiver = new Observable<Uint8Array>(s2 => {
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
        // const sender = new Subject<Uint8Array>()
        // const sub = sender.subscribe(
        //     buf => ws.send(buf),
        //     err => ws.close(4000, err.toString()),
        //     () => ws.close()
        // )
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
        ws.onopen = function (ev) {
            s.next({
                receiver,
                output: outputCb,
                // sender,
            })
        }
        return () => {
            onUnsubscribe(outputCb)
            sub.unsubscribe()
            ws.close()
        }
    })

//初始化Peer
export const init = (connector: Connector, myInfo: ritp.IPeerInfo): Observable<Peer> => connector(output => {
    //onUnsubscribe
    output(of(ritp.Frame.encode({ disconnect: {} }).finish()))
}).pipe(
    tap(({ output }) => output(of(ritp.PeerInfo.encode(myInfo).finish()))),
    flatMap(({ receiver, output }) => receiver.pipe(
        take(1),
        map(buf => ritp.PeerInfo.decode(buf)),
        map(remoteInfo => {
            const groupedFramesByType = receiver.pipe(
                map(buf => ritp.Frame.decode(buf)),
                groupBy(frame => frame.type),
                shareReplay(),
            )

            const controls = groupedFramesByType.pipe(
                find(group => group.key == "control"),
                flatMap(group => group),
                map(frame => frame.control as ritp.Control),
            )
            // const outputEvents = (events: Observable<ritp.IEvent>) => output(
            //     events.pipe(
            //         map(event => ritp.Frame.encode({ event }).finish()),
            //     )
            // )
            // const outputControls = (controls: Observable<ritp.IControl>) => output(
            //     controls.pipe(
            //         map(control => ritp.Frame.encode({ control }).finish()),
            //     )
            // )
            const groupedControlsByStreamId = controls.pipe(
                groupBy(control => control.streamId),
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
                const controls = groupedControlsByStreamId.pipe(
                    find(group => group.key == streamId),
                    flatMap(group => group),
                )
                const groupedControlsByType = controls.pipe(
                    groupBy(control => control.type),
                )
                const remoteClose = groupedControlsByType.pipe(
                    find(group => group.key == "close"),
                    flatMap(group => group),
                    take(1),
                    flatMap(control => throwError(control.close)),
                )
                const pullsAmounts = groupedControlsByType.pipe(
                    find(group => group.key == "pull"),
                    flatMap(group => group),
                    scan((acc, control) => acc + control.pull, 0),
                )
                const sends = new BehaviorSubject<number>(0)
                const sendableAmounts = merge(pullsAmounts, sends).pipe(
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
                        withLatestFrom(isSendable),
                        filter(([_, sendable]) => sendable),
                        tap(() => sends.next(-1)),
                        map(([buf, _]) => ({ streamId, buf })),
                        startWith({ streamId, request }),
                        endWith({ streamId, end: { reason: ritp.End.Reason.COMPLETE } }),
                        catchError(err => of({ streamId, end: { reason: ritp.End.Reason.CANCEL, detail: err.message } })),
                        map(data => ritp.Frame.encode({ data }).finish()),
                    )
                )
                return { sendableAmounts, outputBufs, isSendable }
            }
            const data = groupedFramesByType.pipe(
                find(group => group.key == "data"),
                flatMap(group => group),
                map(frame => frame.data as ritp.Data),
            )
            const groupedDataByStreamId = data.pipe(
                groupBy(d => d.streamId),
                shareReplay(),
            )
            const requests = groupedFramesByType.pipe(
                find(group => group.key == "request"),
                flatMap(group => group),
                map(frame => frame.request as ritp.Request),
            )
            // const groupedRequestsByStreamId = requests.pipe(
            //     groupBy(d => d.streamId),
            //     shareReplay(),
            // )
            const streamRequests = requests.pipe(
                map(request => {
                    const streamId = request.streamId
                    const data = groupedDataByStreamId.pipe(
                        find(group => group.key == streamId),
                        flatMap(group => group),
                    )
                    const groupedDataByType = data.pipe(
                        groupBy(d => d.type),
                    )
                    const theEnd = groupedDataByType.pipe(
                        find(group => group.key == "end"),
                        flatMap(group => group),
                        take(1),
                        flatMap(d => d.end.reason != ritp.End.Reason.COMPLETE ? throwError(d.end) : of(d.end)),
                    )
                    //需要验证buf的数量
                    const bufs = groupedDataByType.pipe(
                        find(group => group.key == "buf"),
                        flatMap(group => group),
                        map(d => d.buf),
                        takeUntil(theEnd),
                    )
                    const outputPulls = (pulls: Observable<number>) => output(
                        pulls.pipe(
                            map(pull => ({ streamId, pull })),
                            map(control => ritp.Frame.encode({ control }).finish()),
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
                // outputEvents,
                // outputControls,
            }
        }),
    )),
)
