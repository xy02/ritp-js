import { merge, Observable, BehaviorSubject, Subject, of, combineLatest, throwError } from 'rxjs'
import { map, scan, ignoreElements, tap, withLatestFrom, flatMap, take, takeUntil, shareReplay, groupBy, skip, filter, find, share, last } from "rxjs/operators";
import { ritp } from "./pb";

export interface Socket {
    send: (buf: Uint8Array) => void
    onBuffer: (cb: (buf: Uint8Array) => void) => void
    // onOpen: (cb: () => void) => void
    onClose: (cb: (reason: string) => void) => void
    close: () => void
    // isOpen: () => boolean
}

export interface PeerConfig<T> {
    sockets: Observable<Socket>
    myInfo: ritp.IPeerInfo
    //return mappedInfo
    remoteInfoMapper?: (remoteInfo: ritp.PeerInfo) => Observable<T>
}

export interface Peer<T> {
    stream: (config: StreamConfig<T>) => Observable<number>
    register: (factory: HandlerFactory<T>) => Observable<Uint8Array>
}

export interface PeerContext<T> {
    myInfo: ritp.IPeerInfo
    remoteInfo: ritp.IPeerInfo
    // mappedInfo: T
    observableInfo: Observable<T>
}

export interface StreamConfig<T> {
    request: ritp.IRequest
    //请求程序，根据交通信号(true表示可以，false表示不可以)生产数据，返回可观察的生产出的数据
    requester: (ctx: RequesterContext<T>) => Observable<Uint8Array>
}

export interface RequesterContext<T> {
    peerContext: PeerContext<T>
    request: ritp.IRequest
    sendableAmounts: Observable<number>
}

export interface HandlerFactory<T> {
    handlerName: string
    //处理程序，接收处理数据，返回可观察的交通信号，true/false分别表示消费者可以/不可以接收数据
    handler: (ctx: HandlerContext<T>) => Observable<number>
    bufferSize?: number
}

export interface HandlerContext<T> {
    peerContext: PeerContext<T>
    request: ritp.IRequest
    chunks: Observable<Uint8Array>
}

export const createH5WebSocket = (url: string): Observable<Socket> => {
    if (!window) {
        return throwError('no window')
    }
    return new Observable<Socket>(sub => {
        const ws = new WebSocket(url, 'ritp')
        ws.binaryType = "arraybuffer"
        ws.onclose = function (ev) {
            sub.error(ev.reason)
        }
        ws.onopen = function (ev) {
            ws.onclose = null
            const send = (buf: Uint8Array) => {
                console.info("send:", buf)
                ws.send(buf)
            }
            const onClose = (cb: (reason: string) => void) => {
                ws.addEventListener("close", ev => {
                    cb(ev.reason)
                })
            }
            const onBuffer = (cb: (buf: Uint8Array) => void) => {
                ws.addEventListener("message", ev => {
                    const buf = new Uint8Array(ev.data)
                    console.info("received:", buf)
                    cb(buf)
                })
            }
            const close = () => {
                ws.close()
            }
            sub.next({
                send,
                onClose,
                onBuffer,
                close,
            })
            sub.complete()
        }
    })
}

export const init = <T>({ sockets, myInfo, remoteInfoMapper = of }: PeerConfig<T>): Observable<Peer<T>> => sockets.pipe(
    flatMap(({ send, onBuffer, onClose, close }) => new Observable<Connection>(sub => {
        onClose(reason => {
            sub.error(reason)
        })
        const buffers = new Subject<Uint8Array>()
        onBuffer(buf => {
            buffers.next(buf)
        })
        sub.next({
            send,
            buffers
        })
        send(ritp.PeerInfo.encode(myInfo).finish())
        return () => {
            send(ritp.Frame.encode({ disconnect: {} }).finish())
            close()
        }
    })),
    map(({ buffers, send }) => {
        const remoteInfo = buffers.pipe(
            take(1),
            map(buf => ritp.PeerInfo.decode(buf))
        )
        // const mappedInfo = remoteInfo.pipe(
        //     flatMap(remoteInfoMapper)
        // )
        // const peerContext = combineLatest(remoteInfo, mappedInfo).pipe(
        //     map(([remoteInfo, mappedInfo]) => ({
        //         myInfo, remoteInfo, mappedInfo
        //     })),
        //     shareReplay(),
        // )
        const observableInfo = remoteInfo.pipe(
            flatMap(remoteInfoMapper),
            shareReplay(1),
        )
        const peerContext = remoteInfo.pipe(
            map(remoteInfo => ({
                myInfo, remoteInfo, observableInfo
            })),
            shareReplay(),
        )
        const groupedFramesByType = buffers.pipe(
            // skip(1),
            map(buf => ritp.Frame.decode(buf)),
            groupBy(frame => frame.type),
            shareReplay(),
        )
        const events = groupedFramesByType.pipe(
            find(group => group.key == "event"),
            flatMap(group => group),
            map(frame => frame.event as ritp.Event),
        )
        //wrong
        const streams: Observable<Stream> = events.pipe(
            groupBy(ev => ev.streamId),
            flatMap(group => {
                const streamId = group.key
                const groupedEventsByType = group.pipe(
                    groupBy(ev => ev.type),
                    shareReplay(),
                )
                const firstRequest = groupedEventsByType.pipe(
                    take(1), //wrong
                    flatMap(g => g.key == "request" ? g : throwError(new Error('oops!'))),
                    map(g => g.request),
                )
                const chunks = groupedEventsByType.pipe(
                    find(g => g.key == "chunk"),
                    flatMap(g => g),
                    map(ev => ev.chunk),
                )
                const end = groupedEventsByType.pipe(
                    find(g => g.key == "end"),
                    flatMap(g => g),
                    map(ev => ev.end),
                )
                return firstRequest.pipe(
                    map(request => ({ streamId, handlerName: request.handlerName, request, chunks, end }))
                )
            })
        )
        const groupedStreamsByHandlerName = streams.pipe(
            groupBy(stream => stream.handlerName),
            shareReplay(),
        )
        const findStreamsByHandlerName = (handlerName: string) => groupedStreamsByHandlerName.pipe(
            find(group => group.key == handlerName),
            flatMap(group => group),
        )
        const registerContext = peerContext.pipe(
            map(ctx => ({ peerContext: ctx, findStreamsByHandlerName, sender: { send } }))
        )
        const controls = groupedFramesByType.pipe(
            find(group => group.key == "control"),
            flatMap(group => group),
            map(frame => frame.control as ritp.Control),
        )
        const groupedControlsByStreamId = controls.pipe(
            groupBy(control => control.streamId),
            shareReplay(),
        )
        const streamIdSubject = new BehaviorSubject<number>(0)
        const newStreamId = streamIdSubject.pipe(
            take(1),
            tap(x => streamIdSubject.next(x + 1)),
        )
        const newStreamContext = combineLatest(newStreamId, peerContext).pipe(
            map(([streamId, peerContext]) => {
                const controls = groupedControlsByStreamId.pipe(
                    find(group => group.key == streamId),
                    flatMap(group => group),
                )
                const sendRequest = (request: ritp.IRequest) => {
                    // send(ritp.Frame.encode({ event: { streamId, request } }).finish())
                    console.info('prepare request frame', streamId, request)
                    let test = ritp.Frame.encode({ event: { streamId, request } }).finish()
                    // console.info('the request proto buf',test)
                    send(test)
                }
                const sendChunk = (chunk: Uint8Array) => send(ritp.Frame.encode({ event: { streamId, chunk } }).finish())
                const sendEnd = (end: ritp.IEnd) => send(ritp.Frame.encode({ event: { streamId, end } }).finish())
                return { peerContext, controls, sendRequest, sendChunk, sendEnd }
            }),
        )
        return {
            stream: stream(newStreamContext),
            register: register(registerContext),
        }
    }),
)


interface StreamContext<T> {
    peerContext: PeerContext<T>
    controls: Observable<ritp.Control>
    sendRequest: (request: ritp.IRequest) => void
    sendChunk: (chunk: Uint8Array) => void
    sendEnd: (end: ritp.IEnd) => void
}

interface Stream {
    streamId: number | Long,
    handlerName: string
    request: ritp.IRequest
    chunks: Observable<Uint8Array>
    end: Observable<ritp.IEnd>
}

interface RegisterContext<T> {
    peerContext: PeerContext<T>
    findStreamsByHandlerName: (handlerName: string) => Observable<Stream>
    sender: Sender
}

interface Sender {
    send: (buf: Uint8Array) => void
}

interface Connection {
    send: (buf: Uint8Array) => void,
    buffers: Observable<Uint8Array>
}

const stream = <T>(newStreamContext: Observable<StreamContext<T>>) => ({
    request,
    requester
}: StreamConfig<T>): Observable<number> => newStreamContext.pipe(
    tap(({ sendRequest }) => sendRequest(request)),
    flatMap(({ peerContext, controls, sendChunk, sendEnd }) => {
        const sendableAmountSubject = new BehaviorSubject<number>(0)
        const handledChunks = requester({ peerContext, request, sendableAmounts: sendableAmountSubject })
        const isSendable = sendableAmountSubject.pipe(
            map(num => num > 0)
        )
        const sends = handledChunks.pipe(
            withLatestFrom(isSendable),
            filter(([_, sendable]) => sendable),
            tap(
                ([chunk, _]) => sendChunk(chunk),
                err => sendEnd({ reason: ritp.End.Reason.CANCEL, detail: JSON.stringify(err) }),
                () => sendEnd({ reason: ritp.End.Reason.FINISH })
            ),
            map(_ => -1),
            share(),
        )
        const theEnd = sends.pipe(last())
        const groupedControlsByType = controls.pipe(
            groupBy(control => control.type),
        )
        const remoteClose = groupedControlsByType.pipe(
            find(group => group.key == "close"),
            flatMap(group => group),
            // tap(control => sendableAmountSubject.error(control.close)),
            flatMap(control => throwError(control.close)),
        )
        const pulls = groupedControlsByType.pipe(
            find(group => group.key == "pull"),
            flatMap(group => group),
            scan((acc, control) => acc + control.pull, 0),
            // share(),
        )
        const sendableAmounts = merge(pulls, sends).pipe(
            scan((acc, num) => acc + num, 0),
            tap(num => sendableAmountSubject.next(num)),
            takeUntil(remoteClose),
            takeUntil(theEnd),
        )
        return sendableAmounts
        // const finish = sendableAmount.pipe(last())
        // return totalPulls.pipe(
        //     takeUntil(finish),
        // )
    }),
)

const register = <T>(ctx: Observable<RegisterContext<T>>) => ({
    handlerName,
    handler,
    bufferSize = 100,
}: HandlerFactory<T>): Observable<Uint8Array> => ctx.pipe(
    flatMap(({ peerContext, findStreamsByHandlerName, sender }) => findStreamsByHandlerName(handlerName).pipe(
        //处理一个stream
        flatMap(({ request, chunks, streamId }) => {
            const pulls = handler({ peerContext, request, chunks }).pipe(
                tap(
                    pull => sender.send(ritp.Frame.encode({ control: { streamId, pull } }).finish()),
                    err => sender.send(ritp.Frame.encode({
                        control: {
                            streamId, close: {
                                reason: ritp.Close.Reason.APPLICATION_ERROR, detail: JSON.stringify(err)
                            }
                        }
                    }).finish()),
                    () => sender.send(ritp.Frame.encode({
                        control: {
                            streamId, close: {
                                reason: ritp.Close.Reason.ABORT
                            }
                        }
                    }).finish()),
                ),
                ignoreElements(),
            )
            return merge(pulls, chunks)
        })
    )),
)
