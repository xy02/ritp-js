import { Observable } from 'rxjs';
import { ritp } from "./pb";
interface Socket {
    send: (buf: Uint8Array) => void;
    onBuffer: (cb: (buf: Uint8Array) => void) => void;
    onOpen: (cb: () => void) => void;
    onClose: (cb: (reason: string) => void) => void;
    close: () => void;
    isOpen: () => boolean;
}
interface PeerConfig<T> {
    socket: Observable<Socket>;
    myInfo: ritp.IPeerInfo;
    remoteInfoMapper?: (remoteInfo: ritp.PeerInfo) => Observable<T>;
}
interface Peer<T> {
    stream: (config: StreamConfig<T>) => Observable<number>;
    register: (factory: HandlerFactory<T>) => Observable<Uint8Array>;
}
interface PeerContext<T> {
    myInfo: ritp.IPeerInfo;
    remoteInfo: ritp.IPeerInfo;
    mappedInfo: T;
}
interface StreamConfig<T> {
    request: ritp.IRequest;
    requester: (ctx: RequesterContext<T>) => Observable<Uint8Array>;
}
interface RequesterContext<T> {
    peerContext: PeerContext<T>;
    request: ritp.IRequest;
    sendableAmount: Observable<number>;
}
interface HandlerFactory<T> {
    handlerName: string;
    handler: (ctx: HandlerContext<T>) => Observable<number>;
    bufferSize?: number;
}
interface HandlerContext<T> {
    peerContext: PeerContext<T>;
    request: ritp.IRequest;
    chunks: Observable<Uint8Array>;
}
export declare const createH5WebSocket: (url: string) => Observable<Socket>;
export declare const init: <T>({ socket, myInfo, remoteInfoMapper }: PeerConfig<T>) => Observable<Peer<T>>;
export {};
