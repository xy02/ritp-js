import { Observable, Subject } from 'rxjs';
import { ritp } from "./pb";
export interface Connection {
    buffers: Observable<Uint8Array>;
    sender: Subject<Uint8Array>;
}
export interface Peer {
    remoteInfo: ritp.IPeerInfo;
    events: Observable<ritp.Event>;
    eventsPullSender: Subject<number>;
    stream: (request: ritp.IRequest) => Stream;
    register: (path: string) => Observable<StreamRequest>;
}
export interface Stream {
    pulls: Observable<number>;
    sendableAmounts: Observable<number>;
    isSendable: Observable<boolean>;
    bufSender: Subject<Uint8Array>;
}
export interface StreamRequest {
    request: ritp.IRequest;
    bufs: Observable<Uint8Array>;
    pullSender: Subject<number>;
}
export declare const h5WsConnection: (url: string) => Observable<Connection>;
export declare const init: (connections: Observable<Connection>, myInfo: ritp.IPeerInfo) => Observable<Peer>;
