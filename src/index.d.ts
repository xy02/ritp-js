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
    stream: (header: ritp.IHeader) => Stream;
    register: (fn: string) => Observable<OnStream>;
}
export interface Stream {
    pulls: Observable<number>;
    sendableAmounts: Observable<number>;
    isSendable: Observable<boolean>;
    bufSender: Subject<Uint8Array>;
}
export interface OnStream {
    header: ritp.IHeader;
    bufs: Observable<Uint8Array>;
    bufPuller: Subject<number>;
}
export declare const getStrFromUint8Array: (u8arr: Uint8Array) => Observable<string>;
export declare const getUint8ArrayFromStr: (str: string) => Observable<Uint8Array>;
export declare const fromH5WebSocket: (url: string) => Observable<Socket>;
export declare const initWith: (myInfo: ritp.IInfo) => (sockets: Observable<Socket>) => Observable<Connection>;
