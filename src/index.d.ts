import { Observable } from 'rxjs';
import { ritp } from "./pb";
export interface Socket {
    send: (buf: Uint8Array) => void;
    onBuffer: (cb: (buf: Uint8Array) => void) => void;
    onClose: (cb: (reason: string) => void) => void;
    close: () => void;
}
export interface PeerConfig<T> {
    sockets: Observable<Socket>;
    myInfo: ritp.IPeerInfo;
    remoteInfoMapper?: (remoteInfo: ritp.PeerInfo) => Observable<T>;
}
export interface Peer<T> {
    stream: (config: StreamConfig<T>) => Observable<number>;
    register: (factory: HandlerFactory<T>) => Observable<Uint8Array>;
}
export interface PeerContext<T> {
    myInfo: ritp.IPeerInfo;
    remoteInfo: ritp.IPeerInfo;
    observableInfo: Observable<T>;
}
export interface StreamConfig<T> {
    request: ritp.IRequest;
    requester: (ctx: RequesterContext<T>) => Observable<Uint8Array>;
}
export interface RequesterContext<T> {
    peerContext: PeerContext<T>;
    request: ritp.IRequest;
    sendableAmounts: Observable<number>;
}
export interface HandlerFactory<T> {
    handlerName: string;
    handler: (ctx: HandlerContext<T>) => Observable<number>;
    bufferSize?: number;
}
export interface HandlerContext<T> {
    peerContext: PeerContext<T>;
    request: ritp.IRequest;
    chunks: Observable<Uint8Array>;
}
export declare const createH5WebSocket: (url: string) => Observable<Socket>;
export declare const init: <T>({ sockets, myInfo, remoteInfoMapper }: PeerConfig<T>) => Observable<Peer<T>>;
