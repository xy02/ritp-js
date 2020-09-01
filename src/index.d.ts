import { Observable } from 'rxjs';
import { ritp } from "./pb";
export interface Connection {
    buffers: Observable<Uint8Array>;
    output: (bufs: Observable<Uint8Array>) => void;
    onUnsubscribe: Observable<void>;
}
export interface Peer {
    remoteInfo: ritp.IPeerInfo;
    stream: (request: ritp.IRequest) => Stream;
    register: (path: string) => Observable<StreamRequest>;
}
export interface Stream {
    sendableAmounts: Observable<number>;
    isSendable: Observable<boolean>;
    outputBufs: (bufs: Observable<Uint8Array>) => void;
}
export interface StreamRequest {
    request: ritp.IRequest;
    bufs: Observable<Uint8Array>;
    outputPulls: (pulls: Observable<number>) => void;
}
export declare const h5WsConnection: (url: string) => Observable<Connection>;
export declare const init: (connection: Observable<Connection>, myInfo: ritp.IPeerInfo) => Observable<Peer>;
