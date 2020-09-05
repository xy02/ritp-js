import { merge, Observable, BehaviorSubject, Subject, of, combineLatest, throwError, concat, from } from 'rxjs'
import { map, scan, ignoreElements, tap, withLatestFrom, flatMap, take, takeUntil, shareReplay, groupBy, skip, filter, find, share, last, finalize, catchError, endWith, startWith, distinctUntilChanged, switchMap } from "rxjs/operators";
import { ritp } from "./pb";

export interface Connection {
    buffers: Observable<Uint8Array>
    sender: Subject<Uint8Array>
    // onUnsubscribe: Observable<void>
}

export interface Peer {
    remoteInfo: ritp.IPeerInfo
    events: Observable<ritp.Event>
    eventsPullSender: Subject<number>
    //创建stream
    stream: (request: ritp.IRequest) => Stream
    //注册stream处理路径
    register: (path: string) => Observable<StreamRequest>
}

export interface Stream {
    pulls: Observable<number>
    sendableAmounts: Observable<number>
    isSendable: Observable<boolean>
    // outputBufs: (bufs: Observable<Uint8Array>) => void
    bufSender: Subject<Uint8Array>
}

export interface StreamRequest {
    request: ritp.IRequest
    bufs: Observable<Uint8Array>
    // outputPulls: (pulls: Observable<number>) => void
    pullSender: Subject<number>
}

export const h5WsConnection = (url: string) => new Observable<Connection>(s => {
    const ws = new WebSocket(url, 'ritp')
    ws.binaryType = "arraybuffer"
    const sender = new Subject<Uint8Array>()
    const sub = sender.subscribe(
        buf => ws.send(buf),
        err => {
            if (ws.readyState == ws.OPEN) ws.close(4000, err.toString())
        },
        () => {
            if (ws.readyState == ws.OPEN) ws.close()
        }
    )
    ws.onclose = function (ev) {
        sender.error(ev.reason)
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
    }).pipe(
        takeUntil(sender.pipe(last()))
    )
    ws.onopen = function (ev) {
        s.next({
            buffers,
            sender,
        })
        s.complete()
    }
    return () => {
        sub.unsubscribe()
    }
})

class Queue<T> {
    //自增长key的容器Map，Map比Array有更高的增删性能
    private map = new Map<number, T>()
    private firstKey: number = 0
    private currentKey: number = 0
    //向队尾推入元素
    push = (value: T) => this.map.set(this.currentKey++, value)
    //获取队头元素
    pop = (): T => {
        const v = this.map.get(this.firstKey)
        this.map.delete(this.firstKey)
        this.firstKey++
        return v
    }

    *[Symbol.iterator]() {
        while (this.firstKey < this.currentKey) {
            yield this.pop()
        }
    }
}

//初始化Peer
export const init = (connections: Observable<Connection>, myInfo: ritp.IPeerInfo): Observable<Peer> => connections.pipe(
    tap(({ sender }) => {
        sender.next(ritp.PeerInfo.encode(myInfo).finish())
    }),
    flatMap(({ buffers, sender }) => buffers.pipe(
        take(1),
        map(buf => ritp.PeerInfo.decode(buf)),
        map(remoteInfo => {
            const groupedFramesByType = buffers.pipe(
                finalize(() => sender.next(ritp.Frame.encode({ disconnect: {} }).finish())),
                map(buf => ritp.Frame.decode(buf)),
                groupBy(frame => frame.type),
                shareReplay(),
            )
            const remoteDisconnect = groupedFramesByType.pipe(
                find(group => group.key == "disconnect"),
                flatMap(group => group),
                take(1),
                flatMap(ev => throwError('disconnect')),
            )
            const pulls = groupedFramesByType.pipe(
                find(group => group.key == "pull"),
                flatMap(group => group),
                map(frame => frame.pull),
            )
            const eventSender = new Subject<Observable<ritp.IEvent>>()
            const outputEvents = eventSender.pipe(
                flatMap(o => o),
                share(),
            )
            const sendableAmounts = merge(outputEvents.pipe(map(_ => -1)), pulls).pipe(
                takeUntil(remoteDisconnect),
                scan((acc, num) => acc + num, 0),
                shareReplay(1),
            )
            const isSendable = sendableAmounts.pipe(
                map(amount => amount > 0),
                distinctUntilChanged(),
                shareReplay(1),
            )
            const queue = new Queue<ritp.IEvent>()
            const sentEvent = isSendable.pipe(
                switchMap(sendable =>
                    sendable ?
                        concat(
                            sendableAmounts.pipe(
                                take(1),
                                flatMap(n => from(queue).pipe(
                                    take(n),
                                )),
                            ),
                            outputEvents
                        ) :
                        outputEvents.pipe(
                            tap(ev => queue.push(ev)),
                            ignoreElements(),
                        )
                ),
                tap(event => sender.next(ritp.Frame.encode({ event }).finish())),
            )
            const events = groupedFramesByType.pipe(
                find(group => group.key == "event"),
                flatMap(group => group),
                map(frame => frame.event as ritp.Event),
                takeUntil(sentEvent.pipe(last())),
                share(),
            )
            const eventsPullSender = new Subject<number>()
            const sentEventsPulls = eventsPullSender.pipe(
                tap(pull => sender.next(ritp.Frame.encode({ pull }).finish())),
            )
            const eventsOverflow = merge(events.pipe(map(_ => -1)), sentEventsPulls).pipe(
                scan((acc, num) => acc + num, 0),
                filter(acc => acc < 0),
                tap(_ => {
                    //输出错误
                    sender.next()
                    sender.complete()
                }),
                flatMap(_ => throwError({ reason: 'eventsOverflow' })),
            )
            const groupedEventsByType = events.pipe(
                takeUntil(eventsOverflow), //约束连接级输入
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
                // const sends = new BehaviorSubject<number>(0)
                const bufSender = new Subject<Uint8Array>()
                const sendableAmounts = merge(bufSender.pipe(map(_ => -1)), pulls).pipe(
                    takeUntil(remoteClose),
                    scan((acc, num) => acc + num, 0),
                    shareReplay(1),
                )
                const isSendable = sendableAmounts.pipe(
                    map(amount => amount > 0),
                    distinctUntilChanged(),
                    shareReplay(1),
                )
                eventSender.next(
                    bufSender.pipe(
                        takeUntil(remoteClose),
                        withLatestFrom(isSendable),
                        filter(([_, sendable]) => sendable),
                        // tap(() => sends.next(-1)),
                        map(([buf, _]) => ({ streamId, buf })),
                        startWith({ streamId, request }),
                        endWith({ streamId, end: { reason: ritp.End.Reason.COMPLETE } }),
                        catchError(err => of({ streamId, end: { reason: ritp.End.Reason.CANCEL, message: err.message } })),
                        // map(event => ritp.Frame.encode({ event }).finish()),
                    )
                )
                return { pulls, sendableAmounts, bufSender, isSendable }
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
                    const bufs = groupedBufEventsByStreamId.pipe(
                        find(group => group.key == streamId),
                        flatMap(group => group),
                        map(ev => ev.buf),
                        takeUntil(theEnd),
                        share(),
                    )
                    const pullSender = new Subject<number>()
                    const bufsOverflow = merge(bufs.pipe(map(_ => -1)), pullSender).pipe(
                        scan((acc, num) => acc + num, 0),
                        filter(acc => acc < 0),
                        tap(_ => {
                            //输出错误
                            sender.next()
                            sender.complete()
                        }),
                        flatMap(_ => throwError({ reason: 'bufsOverflow' })),
                    )
                    eventSender.next(
                        pullSender.pipe(
                            map(pull => ({ streamId, pull })),
                        )
                    )
                    const path = request.path
                    return { path, request, bufs: bufs.pipe(takeUntil(bufsOverflow)), pullSender }
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
                events,
                eventsPullSender,
                stream,
                register,
            }
        }),
    )),
)
