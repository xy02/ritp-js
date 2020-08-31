import { Observable } from 'rxjs';
import { ritp } from "./pb";
declare type Output = (bufs: Observable<Uint8Array>) => void;
export interface Connector {
    (onUnsubscribe: (output: Output) => void): Observable<Connection>;
}
export interface Connection {
    receiver: Observable<Uint8Array>;
    output: (bufs: Observable<Uint8Array>) => void;
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
    path: string;
    request: ritp.IRequest;
    bufs: Observable<Uint8Array>;
    outputPulls: (pulls: Observable<number>) => void;
}
export declare const h5WsConnector: (url: string) => (onUnsubscribe: (output: Output) => void) => Observable<Connection>;
export declare const init: (connector: Connector, myInfo: ritp.IPeerInfo) => Observable<Peer>;
export {};
