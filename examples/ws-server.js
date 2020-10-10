const { Observable, Subject, of, merge, throwError, EMPTY } = require('rxjs')
const { mergeMap, map, mapTo, tap, share, scan, takeUntil, catchError } = require("rxjs/operators");
const { initWith } = require("../dist/index")
// const { initWith } = require("ritp-js");
// const { ritp } = require("ritp-js/src/pb")
const { Server } = require("ws");
//创建ws服务器，返回Observable<Socket>
const sockets = createWebSockets({
    port: 8000,
    handleProtocols: (protocols) => {
        console.log(protocols)
        return protocols
    }
}).pipe(
    mergeMap(toSocket),
)
//本端信息
const myInfo = {
    version: "0.3",
    //任意二进制数据
    data: Buffer.from(JSON.stringify({
        name: 'app Y',
        state: 'something useful',
    })),
}
//获取初始化函数
const init = initWith(myInfo)
//初始化，Observable<Socket> -> Observable<Connection>
const conns = init(sockets)
//处理连接
conns.pipe(
    mergeMap(handleConnection),
).subscribe()

function handleConnection({ remoteInfo, msgs, msgPuller, stream, register }) {
    //处理remoteInfo
    const failed = false //模拟处理成功
    const firstPull = failed ? throwError('failed') : of(10000).pipe(
        tap(_ => registerFns({ remoteInfo, stream, register })),//注册功能
    )
    const pulls = msgs.pipe(
        mapTo(1), //收1个拉1个
    )
    return merge(pulls, firstPull).pipe(
        catchError(err=> EMPTY),
        tap(msgPuller),//拉取连接级消息（非常重要）
    )
}

function registerFns(ctx) {
    merge(
        accFn(ctx),
        //其他fn....
    ).pipe(
        catchError(err=> EMPTY),
    ).subscribe()
}

//累加收到的数据个数
function accFn({ remoteInfo, stream, register }) {
    return register('acc').pipe(
        tap(({ header, bufs, bufPuller }) => {
            //验证请求
            console.info("onHeader:", header.fn)
            //请求创建下游流
            const outputStream = stream({ fn: header.outputTo, bufType: 'json' })
            //处理上游发来的数据（未向上游拉取数据时是不会收到数据的）
            const handledBufs = bufs.pipe(
                scan((acc, val) => acc + 1, 0),
                map(acc => {
                    // const buf = Buffer.alloc(4)
                    // buf.writeUInt32BE(acc)
                    const json = JSON.stringify({ time: new Date().toLocaleString(), acc })
                    const buf = Buffer.from(json)
                    return buf
                }),
            )
            //向下游输出处理过的数据
            handledBufs.subscribe(outputStream.bufSender)
            //让拉取上游数据的速度与下游outputStream的拉取速度相同
            outputStream.pulls.subscribe(bufPuller)
        }),
    )
}

function createWebSockets(options) {
    return new Observable(s => {
        const wss = new Server(options)
        wss.on('close', function close() {
            s.error("close")
        })
        wss.on('connection', function connection(ws) {
            s.next(ws)
        })
    })
}
function toSocket(ws) {
    return new Observable(s => {
        const sender = new Subject()
        const theEnd = new Observable(s2 => {
            ws.on('close', function (code, reason) {
                s2.error(reason)
            })
        })

        const buffers = new Observable(s2 => {
            // console.log('on sub buffers')
            sender.pipe(
                takeUntil(theEnd),
            ).subscribe(
                buf => {
                    ws.send(buf)
                    // console.log("send:", buf)
                },
                err => {
                    ws.close(4000, err.toString())
                    s2.error(err)
                    // console.log("close ws:", err)
                },
                () => {
                    ws.close()
                    s2.complete()
                }
            )
            const cb = (data) => {
                // console.log('received:', data);
                s2.next(data)
            }
            ws.addListener("message", cb)
            return () => {
                console.log('on unsub buffers')
                ws.removeListener("message", cb)
                sender.complete()
            }
        }).pipe(
            // finalize(()=>console.log('buffers finalize')),
            takeUntil(theEnd),
            share(),
        )
        // console.log('on open')
        s.next({
            buffers,
            sender,
        })
        s.complete()
    })
}
