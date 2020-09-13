import { Observable, Subject } from 'rxjs';
import { ritp } from "./pb";
export interface Socket {
    buffers: Observable<Uint8Array>;
    sender: Subject<Uint8Array>;
}
export interface Connection {
    remoteInfo: ritp.Info;
    msgs: Observable<ritp.Msg>;
    msgPuller: Subject<number>;
    stream: (call: ritp.ICall) => Stream;
    register: (fn: string) => Observable<StreamCall>;
}
export interface Stream {
    pulls: Observable<number>;
    sendableAmounts: Observable<number>;
    isSendable: Observable<boolean>;
    bufSender: Subject<Uint8Array>;
}
export interface StreamCall {
    call: ritp.ICall;
    bufs: Observable<Uint8Array>;
    bufPuller: Subject<number>;
}
export declare const fromH5WebSocket: (url: string) => Observable<Socket>;
export declare const initWith: (myInfo: ritp.IInfo) => (sockets: Observable<Socket>) => Observable<Connection>;
