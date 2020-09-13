import { merge, Observable, Subject, of, throwError, concat, from, Observer, BehaviorSubject } from 'rxjs'
import { map, scan, ignoreElements, tap, withLatestFrom, flatMap, take, takeUntil, shareReplay, filter, share, last, catchError, endWith, startWith, distinctUntilChanged, repeat } from "rxjs/operators";
import { ritp } from "./pb";

export interface Socket {
    buffers: Observable<Uint8Array>
    sender: Subject<Uint8Array>
}

export interface Connection {
    remoteInfo: ritp.Info
    msgs: Observable<ritp.Msg>
    msgPuller: Subject<number>
    //创建stream
    stream: (call: ritp.ICall) => Stream
    //注册功能
    register: (fn: string) => Observable<StreamCall>
}

export interface Stream {
    pulls: Observable<number>
    sendableAmounts: Observable<number>
    isSendable: Observable<boolean>
    // outputBufs: (bufs: Observable<Uint8Array>) => void
    bufSender: Subject<Uint8Array>
}

export interface StreamCall {
    call: ritp.ICall
    bufs: Observable<Uint8Array>
    // outputPulls: (pulls: Observable<number>) => void
    bufPuller: Subject<number>
}

export const fromH5WebSocket = (url: string) => new Observable<Socket>(s => {
    const ws = new WebSocket(url, 'ritp')
    ws.binaryType = "arraybuffer"
    const sender = new Subject<Uint8Array>()
    const theEnd = new Observable(s2 => {
        const closeCb = (ev: CloseEvent) => {
            s2.error(ev.reason)
        }
        ws.addEventListener('close', closeCb)
        return () => {
            ws.removeEventListener('close', closeCb)
        }
    })
    const buffers = new Observable<Uint8Array>(s2 => {
        sender.pipe(
            takeUntil(theEnd),
        ).subscribe(
            buf => ws.send(buf),
            err => {
                ws.close(4000, err.toString())
                s2.error(err)
            },
            () => {
                ws.close()
                s2.complete()
            }
        )
        const cb = (ev: MessageEvent) => {
            const buf = new Uint8Array(ev.data)
            // console.info("received:", buf)
            s2.next(buf)
        }
        ws.addEventListener("message", cb)
        return () => {
            ws.removeEventListener("message", cb)
            sender.complete()
        }
    }).pipe(
        takeUntil(theEnd),
        share(),
    )
    ws.onclose = function (ev) {
        s.error(ev.reason)
    }
    ws.onopen = function (ev) {
        ws.onclose = null
        s.next({
            buffers,
            sender,
        })
        s.complete()
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

//比groupBy+find更有效率
const getSubValues = <T, K>(values: Observable<T>, keySelector: (value: T) => K) => {
    const m = new Map<K, Set<Observer<T>>>()
    const lastValue = values.pipe(
        tap(v => {
            const observerSet = m.get(keySelector(v))
            if (!observerSet) return
            observerSet.forEach(observer => observer.next(v))
        }),
        last(),
        share(),
    )
    return (key: K) => new Observable<T>(s => {
        let observerSet = m.get(key)
        if (!observerSet) {
            observerSet = new Set<Observer<T>>()
            m.set(key, observerSet)
        }
        observerSet.add(s)
        return () => {
            observerSet.delete(s)
            if (observerSet.size == 0) m.delete(key)
        }
    }).pipe(
        takeUntil(lastValue),
    )
}

const toGroupedInput = (buffers: Observable<Uint8Array>) => {
    const frames = buffers.pipe(
        map(buf => ritp.Frame.decode(buf)),
        share(),
    )
    const getFramesByType = getSubValues(frames, v => v.type)
    const remoteClose = getFramesByType('close').pipe(
        take(1),
        flatMap(frame => throwError(frame.close)),
        shareReplay(),
    )
    const info = getFramesByType('info').pipe(
        map(frame => frame.info as ritp.Info),
        shareReplay(),
    )
    const errInfoMoreThanOnce = info.pipe(
        scan((acc, v) => acc + 1, 0),
        filter(n => n > 1),
        take(1),
        flatMap(_ => throwError({
            reason: ritp.Close.Reason.PROTOCOL_ERROR,
            message: 'cannot send Info more than once'
        })),
    )
    const pullsToGetMsg = getFramesByType('pull').pipe(
        map(frame => frame.pull),
    )
    const msgs = getFramesByType('msg').pipe(
        map(frame => frame.msg as ritp.Msg),
    )
    return { msgs, pullsToGetMsg, info, remoteClose, errInfoMoreThanOnce }
}

const toOutputContext = (pullsToGetMsg: Observable<number>) => {
    const msgSender = new Subject<ritp.IMsg>()
    const sendingCount = new BehaviorSubject(0)
    const sendableMsgsAmounts = merge(sendingCount, pullsToGetMsg).pipe(
        scan((acc, num) => acc + num, 0),
        shareReplay(1),
    )
    const isMsgSendable = sendableMsgsAmounts.pipe(
        map(amount => amount > 0),
        distinctUntilChanged(),
        shareReplay(1),
    )
    const outputQueue = new Queue<ritp.IMsg>()
    const msgFramesToSend = concat(
        sendableMsgsAmounts.pipe(
            take(1),
            flatMap(n => from(outputQueue).pipe(
                take(n),
            )),
        ),
        msgSender.pipe(
            takeUntil(isMsgSendable.pipe(filter(sendable => !sendable))),
        ),
        msgSender.pipe(
            tap(msg => outputQueue.push(msg)),
            ignoreElements(),
            takeUntil(isMsgSendable.pipe(filter(sendable => sendable))),
        ),
    ).pipe(
        repeat(),
        tap(_ => sendingCount.next(-1)),
        map(msg => ({ msg })),
    )
    const msgPuller = new Subject<number>()
    const pullFramesToSend = msgPuller.pipe(
        map(pull => ({ pull })),
    )
    let sid = 0
    const newStreamId = () => sid++
    return { msgSender, msgPuller, pullFramesToSend, msgFramesToSend, newStreamId }
}

const toInputContext = (msgs: Observable<ritp.Msg>, msgPuller: Subject<number>) => {
    const errInputMsgsOverflow = merge(msgs.pipe(map(_ => -1)), msgPuller).pipe(
        scan((acc, num) => acc + num, 0),
        filter(acc => acc < 0),
        take(1),
        flatMap(_ => throwError({
            reason: ritp.Close.Reason.PROTOCOL_ERROR,
            message: 'input msg overflow'
        })),
    )
    const getMsgsByType = getSubValues(msgs, msg => msg.type)
    const closeMsgs = getMsgsByType('close')
    const getCloseMsgsByStreamId = getSubValues(closeMsgs, msg => msg.streamId)
    const pullMsgs = getMsgsByType('pull')
    const getPullMsgsByStreamId = getSubValues(pullMsgs, msg => msg.streamId)
    const endMsgs = getMsgsByType('end')
    const getEndMsgsByStreamId = getSubValues(endMsgs, msg => msg.streamId)
    const bufMsgs = getMsgsByType('buf')
    const getBufMsgsByStreamId = getSubValues(bufMsgs, msg => msg.streamId)
    const callMsgs = getMsgsByType('call')
    const getCallMsgsByFn = getSubValues(callMsgs, msg => msg.call.fn)
    return { errInputMsgsOverflow, getCallMsgsByFn, getCloseMsgsByStreamId, getPullMsgsByStreamId, getEndMsgsByStreamId, getBufMsgsByStreamId }
}

const registerWith = (
    msgSender: Subject<ritp.IMsg>,
    getCallMsgsByFn: (key: string) => Observable<ritp.Msg>,
    getEndMsgsByStreamId: (key: number) => Observable<ritp.Msg>,
    getBufMsgsByStreamId: (key: number) => Observable<ritp.Msg>,
) => (fn: string): Observable<StreamCall> => getCallMsgsByFn(fn).pipe(
    map(({ streamId, call }) => {
        const theEnd = getEndMsgsByStreamId(streamId).pipe(
            take(1),
            flatMap(ev => ev.end.reason != ritp.End.Reason.COMPLETE ? throwError(ev.end) : of(ev.end)),
        )
        const bufPuller = new Subject<number>()
        const bufs = getBufMsgsByStreamId(streamId).pipe(
            map(ev => ev.buf),
            takeUntil(theEnd),
            takeUntil(bufPuller.pipe(last())),
            share(),
        )
        const bufsOverflow = merge(bufs.pipe(map(_ => -1)), bufPuller).pipe(
            scan((acc, num) => acc + num, 0),
            filter(acc => acc < 0),
            take(1),
            flatMap(_ => throwError({
                reason: ritp.Close.Reason.PROTOCOL_ERROR,
                message: 'input buf overflow'
            })),
        )
        const pullMsgsToSend = bufPuller.pipe(
            map(pull => ({ streamId, pull })),
            endWith({ streamId, close: { reason: ritp.Close.Reason.APPLICATION_ERROR, message: "" } }),
            catchError(err => of({ streamId, close: { reason: ritp.Close.Reason.APPLICATION_ERROR, message: err.message } })),
            takeUntil(bufsOverflow),
        )
        pullMsgsToSend.subscribe(msgSender) //side effect
        return { call, bufs, bufPuller }
    }),
)

const streamWith = (
    newStreamId: () => number,
    msgSender: Subject<ritp.IMsg>,
    getCloseMsgsByStreamId: (key: number) => Observable<ritp.Msg>,
    getPullMsgsByStreamId: (key: number) => Observable<ritp.Msg>,
) => (call: ritp.ICall): Stream => {
    const streamId = newStreamId()
    const remoteClose = getCloseMsgsByStreamId(streamId).pipe(
        take(1),
        flatMap(msg => throwError(msg.close)),
    )
    const pulls = getPullMsgsByStreamId(streamId).pipe(
        map(msg => msg.pull),
        takeUntil(remoteClose),
        share(),
    )
    const bufSender = new Subject<Uint8Array>()
    const bufs = bufSender.pipe(
        takeUntil(remoteClose),
    )
    const sendableAmounts = merge(bufs.pipe(map(_ => -1)), pulls).pipe(
        scan((acc, num) => acc + num, 0),
        shareReplay(1),
    )
    const isSendable = sendableAmounts.pipe(
        map(amount => amount > 0),
        distinctUntilChanged(),
        shareReplay(1),
    )
    const msgsToSend = bufs.pipe(
        withLatestFrom(isSendable),
        filter(([_, sendable]) => sendable),
        map(([buf, _]) => ({ streamId, buf })),
        startWith({ streamId, call }),
        endWith({ streamId, end: { reason: ritp.End.Reason.COMPLETE } }),
        catchError(err => of({ streamId, end: { reason: ritp.End.Reason.CANCEL, message: err.message } })),
    )
    msgsToSend.subscribe(msgSender) //side effect
    return { pulls, sendableAmounts, bufSender, isSendable }
}

export const initWith = (myInfo: ritp.IInfo) => (sockets: Observable<Socket>): Observable<Connection> => sockets.pipe(
    flatMap(({ buffers, sender }) => {
        const { msgs, pullsToGetMsg, info, remoteClose, errInfoMoreThanOnce } = toGroupedInput(buffers)
        const { msgSender, msgPuller, pullFramesToSend, msgFramesToSend, newStreamId } = toOutputContext(pullsToGetMsg)
        const { errInputMsgsOverflow, getCloseMsgsByStreamId, getPullMsgsByStreamId,
            getCallMsgsByFn, getEndMsgsByStreamId, getBufMsgsByStreamId } = toInputContext(msgs, msgPuller)
        const errs = merge(
            errInfoMoreThanOnce,
            errInputMsgsOverflow,
        )
        merge(msgFramesToSend, pullFramesToSend).pipe(
            startWith({ info: myInfo }),
            takeUntil(errs),
            catchError(close => of({ close })),
            map(frame => ritp.Frame.encode(frame).finish()),
            takeUntil(remoteClose),
        ).subscribe(sender) //side effet
        return info.pipe(
            map(remoteInfo => {
                const register = registerWith(msgSender, getCallMsgsByFn, getEndMsgsByStreamId, getBufMsgsByStreamId)
                const stream = streamWith(newStreamId, msgSender, getCloseMsgsByStreamId, getPullMsgsByStreamId)
                return { remoteInfo, msgs, msgPuller, register, stream }
            }),
        )
    }),
)
