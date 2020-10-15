import { merge, Observable, Subject, of, throwError, from, Observer, BehaviorSubject, EMPTY } from 'rxjs'
import { map, scan, tap, withLatestFrom, mergeMap, take, takeUntil, shareReplay, filter, share, last, catchError, endWith, startWith, distinctUntilChanged, mapTo } from "rxjs/operators";
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
    stream: (header: ritp.IHeader, bufs: Observable<Uint8Array>) => Stream
    //注册功能
    register: (fn: string) => Observable<OnStream>
}

export interface Stream {
    pulls: Observable<number>
    // sendableAmounts: Observable<number>
    isSendable: Observable<boolean>
    // outputBufs: (bufs: Observable<Uint8Array>) => void
    // bufSender: Subject<Uint8Array>
}

export interface OnStream {
    header: ritp.IHeader
    bufs: Observable<Uint8Array>
    // outputPulls: (pulls: Observable<number>) => void
    bufPuller: Subject<number>
}

export const getStrFromUint8Array = (u8arr:Uint8Array) => new Observable<string>(s => {
    const b = new Blob([u8arr])
    const fr = new FileReader()
    fr.readAsText(b, 'utf-8')
    fr.onerror = function(ev){
        s.error('bad Uint8Array')
    }
    fr.onloadend = function () {
        s.next(fr.result as string)
        s.complete()
    }
})

export const getUint8ArrayFromStr = (str:string) => new Observable<Uint8Array>(s => {
    if(typeof str != 'string') return s.error('expect a string')
    const b = new Blob([str])
    const fr = new FileReader()
    fr.readAsArrayBuffer(b)
    fr.onloadend = function () {
        const buf = new Uint8Array(fr.result as Uint8Array)
        s.next(buf)
        s.complete()
    }
})

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
        mergeMap(frame => throwError(frame.close)),
        shareReplay(),
    )
    const info = getFramesByType('info').pipe(
        take(1),
        map(frame => frame.info as ritp.Info),
        shareReplay(),
    )
    // const errInfoMoreThanOnce = info.pipe(
    //     scan((acc, v) => acc + 1, 0),
    //     filter(n => n > 1),
    //     take(1),
    //     mergeMap(_ => throwError({
    //         reason: ritp.Close.Reason.PROTOCOL_ERROR,
    //         message: 'cannot send Info more than once'
    //     })),
    // )
    const pullsToGetMsg = getFramesByType('pull').pipe(
        map(frame => frame.pull),
    )
    const msgs = getFramesByType('msg').pipe(
        map(frame => frame.msg as ritp.Msg),
    )
    return { msgs, pullsToGetMsg, info, remoteClose }
}

const toOutputContext = (msgs: Observable<ritp.Msg>, pullsToGetMsg: Observable<number>) => {
    const outputQueue = new Queue<ritp.IMsg>()
    const msgsFromQueue = pullsToGetMsg.pipe(
        mergeMap(pull => from(outputQueue).pipe(
            take(pull),
        )),
        share(),
    )
    const msgSender = new Subject<ritp.IMsg>()
    const sendNotifier = new BehaviorSubject(0)
    const sendableMsgsAmounts = merge(sendNotifier, pullsToGetMsg, msgsFromQueue.pipe(mapTo(-1))).pipe(
        scan((acc, num) => acc + num, 0),
        shareReplay(1),
    )
    const msgFramesToSend = merge(
        msgsFromQueue,
        msgSender.pipe(
            withLatestFrom(sendableMsgsAmounts),
            mergeMap(([msg, amount]) => amount > 0 ? of(msg) : EMPTY.pipe(
                tap({ complete: () => outputQueue.push(msg) })
            )),
            tap(_ => sendNotifier.next(-1)),
        ),
    ).pipe(
        map(msg => ({ msg })),
    )
    const msgPuller = new Subject<number>()
    const pullIncrements = getPullIncrements(msgs, msgPuller, {
        reason: ritp.Close.Reason.PROTOCOL_ERROR,
        message: 'input msg overflow'
    })
    const pullFramesToSend = pullIncrements.pipe(
        map(pull => ({ pull })),
    )
    let sid = 0
    const newStreamId = () => sid++
    return { msgSender, msgPuller, pullFramesToSend, msgFramesToSend, newStreamId }
}

const toInputContext = (msgs: Observable<ritp.Msg>) => {
    const getMsgsByType = getSubValues(msgs, msg => msg.type)
    const closeMsgs = getMsgsByType('close')
    const getCloseMsgsByStreamId = getSubValues(closeMsgs, msg => msg.streamId)
    const pullMsgs = getMsgsByType('pull')
    const getPullMsgsByStreamId = getSubValues(pullMsgs, msg => msg.streamId)
    const endMsgs = getMsgsByType('end')
    const getEndMsgsByStreamId = getSubValues(endMsgs, msg => msg.streamId)
    const bufMsgs = getMsgsByType('buf')
    const getBufMsgsByStreamId = getSubValues(bufMsgs, msg => msg.streamId)
    const headerMsgs = getMsgsByType('header')
    const getHeaderMsgsByFn = getSubValues(headerMsgs, msg => msg.header.fn)
    return { getHeaderMsgsByFn, getCloseMsgsByStreamId, getPullMsgsByStreamId, getEndMsgsByStreamId, getBufMsgsByStreamId }
}

const registerWith = (
    msgSender: Subject<ritp.IMsg>,
    getHeaderMsgsByFn: (key: string) => Observable<ritp.Msg>,
    getEndMsgsByStreamId: (key: number) => Observable<ritp.Msg>,
    getBufMsgsByStreamId: (key: number) => Observable<ritp.Msg>,
) => (fn: string): Observable<OnStream> => getHeaderMsgsByFn(fn).pipe(
    map(({ streamId, header }) => {
        const theEnd = getEndMsgsByStreamId(streamId).pipe(
            take(1),
            mergeMap(ev => ev.end.reason != ritp.End.Reason.COMPLETE ? throwError(ev.end) : of(ev.end)),
        )
        const bufPuller = new Subject<number>()
        const bufs = getBufMsgsByStreamId(streamId).pipe(
            map(ev => ev.buf),
            takeUntil(theEnd),
            takeUntil(bufPuller.pipe(last())),
            share(),
        )
        const pullIncrements = getPullIncrements(bufs, bufPuller, {
            reason: ritp.Close.Reason.PROTOCOL_ERROR,
            message: 'input buf overflow'
        })
        const pullMsgsToSend = pullIncrements.pipe(
            map(pull => ({ streamId, pull })),
            endWith({ streamId, close: { reason: ritp.Close.Reason.APPLICATION_ERROR, message: "" } }),
            catchError(err => of({ streamId, close: { reason: ritp.Close.Reason.APPLICATION_ERROR, message: err.message } })),
        )
        pullMsgsToSend.subscribe(msgSender) //side effect
        return { header, bufs, bufPuller }
    }),
)

const getPullIncrements = (msgs: Observable<any>, pulls: Observable<number>, overflowErr: any) => new Observable<number>(s => {
    let sub = merge(msgs.pipe(mapTo(-1)), pulls).pipe(
        scan(({ windowSize, increment, decrement }, num) => {
            if (num > 0) increment += num
            else decrement -= num
            if (decrement > windowSize) throw overflowErr
            if (decrement >= windowSize / 2) {
                windowSize = windowSize - decrement + increment
                if (increment > 0) s.next(increment)
                increment = 0
                decrement = 0
            }
            return {
                windowSize,
                increment,
                decrement,
            }
        }, {
            windowSize: 0,
            increment: 0,
            decrement: 0,
        }),
    ).subscribe(
        _ => { },
        s.error,
        s.complete,
    )
    return () => {
        sub.unsubscribe()
    }
})

const streamWith = (
    newStreamId: () => number,
    msgSender: Subject<ritp.IMsg>,
    getCloseMsgsByStreamId: (key: number) => Observable<ritp.Msg>,
    getPullMsgsByStreamId: (key: number) => Observable<ritp.Msg>,
) => (header: ritp.IHeader, bufs: Observable<Uint8Array>): Stream => {
    const streamId = newStreamId()
    const sendable = new BehaviorSubject(false)
    const msgs = bufs.pipe(
        withLatestFrom(sendable),
        filter(([_, sendable]) => sendable),
        map(([buf, _]) => ({ streamId, buf })),
        endWith({ streamId, end: { reason: ritp.End.Reason.COMPLETE } }),
        catchError(err => of({ streamId, end: { reason: ritp.End.Reason.CANCEL, message: err.message } })),
        tap(msgSender),
        share(),
    )
    const theEndOfMsgs = msgs.pipe(last())
    const remoteClose = getCloseMsgsByStreamId(streamId).pipe(
        take(1),
        mergeMap(msg => throwError(msg.close)),
    )
    const pulls = getPullMsgsByStreamId(streamId).pipe(
        map(msg => msg.pull),
        takeUntil(theEndOfMsgs),
        takeUntil(remoteClose),
        share(),
    )
    const sendableAmounts = merge(msgs.pipe(mapTo(-1)), pulls).pipe(
        scan((acc, num) => acc + num, 0),
    )
    const isSendable = new Observable<boolean>(subscriber=>{
        const sub = sendableAmounts.pipe(
            map(amount => amount > 0),
            distinctUntilChanged(),
            tap(sendable),
        ).subscribe(subscriber)
        //do after subscribe
        msgSender.next({ streamId, header })
        return ()=>{
            sub.unsubscribe()
        }
    }).pipe(
        share()
    )
    return { pulls, isSendable }
}

export const initWith = (myInfo: ritp.IInfo) => (sockets: Observable<Socket>): Observable<Connection> => sockets.pipe(
    mergeMap(({ buffers, sender }) => {
        const { msgs, pullsToGetMsg, info, remoteClose } = toGroupedInput(buffers)
        const { msgSender, msgPuller, pullFramesToSend, msgFramesToSend, newStreamId } = toOutputContext(msgs, pullsToGetMsg)
        const { getCloseMsgsByStreamId, getPullMsgsByStreamId,
            getHeaderMsgsByFn, getEndMsgsByStreamId, getBufMsgsByStreamId } = toInputContext(msgs)
        // const errs = merge(
        //     errInfoMoreThanOnce,
        // )
        merge(msgFramesToSend, pullFramesToSend).pipe(
            startWith({ info: myInfo }),
            // takeUntil(errs),
            catchError(close => of({ close })),
            map(frame => ritp.Frame.encode(frame).finish()),
            takeUntil(remoteClose),
        ).subscribe(sender) //side effet
        return info.pipe(
            map(remoteInfo => {
                const register = registerWith(msgSender, getHeaderMsgsByFn, getEndMsgsByStreamId, getBufMsgsByStreamId)
                const stream = streamWith(newStreamId, msgSender, getCloseMsgsByStreamId, getPullMsgsByStreamId)
                return { remoteInfo, msgs, msgPuller, register, stream }
            }),
        )
    }),
)
