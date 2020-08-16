import * as $protobuf from "protobufjs";
/** Namespace ritp. */
export namespace ritp {

    /** Properties of a PeerInfo. */
    interface IPeerInfo {

        /** PeerInfo version */
        version?: (string|null);

        /** PeerInfo metadata */
        metadata?: (Uint8Array|null);

        /** PeerInfo chunk */
        chunk?: (Uint8Array|null);
    }

    /** Represents a PeerInfo. */
    class PeerInfo implements IPeerInfo {

        /**
         * Constructs a new PeerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IPeerInfo);

        /** PeerInfo version. */
        public version: string;

        /** PeerInfo metadata. */
        public metadata: Uint8Array;

        /** PeerInfo chunk. */
        public chunk: Uint8Array;

        /**
         * Creates a new PeerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PeerInfo instance
         */
        public static create(properties?: ritp.IPeerInfo): ritp.PeerInfo;

        /**
         * Encodes the specified PeerInfo message. Does not implicitly {@link ritp.PeerInfo.verify|verify} messages.
         * @param message PeerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IPeerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PeerInfo message, length delimited. Does not implicitly {@link ritp.PeerInfo.verify|verify} messages.
         * @param message PeerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IPeerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PeerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PeerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.PeerInfo;

        /**
         * Decodes a PeerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PeerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.PeerInfo;

        /**
         * Verifies a PeerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PeerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PeerInfo
         */
        public static fromObject(object: { [k: string]: any }): ritp.PeerInfo;

        /**
         * Creates a plain object from a PeerInfo message. Also converts values to other types if specified.
         * @param message PeerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.PeerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PeerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Frame. */
    interface IFrame {

        /** Frame pull */
        pull?: (number|null);

        /** Frame event */
        event?: (ritp.IEvent|null);

        /** Frame control */
        control?: (ritp.IControl|null);

        /** Frame disconnect */
        disconnect?: (ritp.IDisconnect|null);
    }

    /** Represents a Frame. */
    class Frame implements IFrame {

        /**
         * Constructs a new Frame.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IFrame);

        /** Frame pull. */
        public pull: number;

        /** Frame event. */
        public event?: (ritp.IEvent|null);

        /** Frame control. */
        public control?: (ritp.IControl|null);

        /** Frame disconnect. */
        public disconnect?: (ritp.IDisconnect|null);

        /** Frame type. */
        public type?: ("pull"|"event"|"control"|"disconnect");

        /**
         * Creates a new Frame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Frame instance
         */
        public static create(properties?: ritp.IFrame): ritp.Frame;

        /**
         * Encodes the specified Frame message. Does not implicitly {@link ritp.Frame.verify|verify} messages.
         * @param message Frame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IFrame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Frame message, length delimited. Does not implicitly {@link ritp.Frame.verify|verify} messages.
         * @param message Frame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IFrame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Frame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Frame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.Frame;

        /**
         * Decodes a Frame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Frame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.Frame;

        /**
         * Verifies a Frame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Frame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Frame
         */
        public static fromObject(object: { [k: string]: any }): ritp.Frame;

        /**
         * Creates a plain object from a Frame message. Also converts values to other types if specified.
         * @param message Frame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.Frame, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Frame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Disconnect. */
    interface IDisconnect {
    }

    /** Represents a Disconnect. */
    class Disconnect implements IDisconnect {

        /**
         * Constructs a new Disconnect.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IDisconnect);

        /**
         * Creates a new Disconnect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Disconnect instance
         */
        public static create(properties?: ritp.IDisconnect): ritp.Disconnect;

        /**
         * Encodes the specified Disconnect message. Does not implicitly {@link ritp.Disconnect.verify|verify} messages.
         * @param message Disconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link ritp.Disconnect.verify|verify} messages.
         * @param message Disconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Disconnect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Disconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.Disconnect;

        /**
         * Decodes a Disconnect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Disconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.Disconnect;

        /**
         * Verifies a Disconnect message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Disconnect
         */
        public static fromObject(object: { [k: string]: any }): ritp.Disconnect;

        /**
         * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
         * @param message Disconnect
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.Disconnect, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Disconnect to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Event. */
    interface IEvent {

        /** Event streamId */
        streamId?: (number|Long|null);

        /** Event request */
        request?: (ritp.IRequest|null);

        /** Event chunk */
        chunk?: (Uint8Array|null);

        /** Event end */
        end?: (ritp.IEnd|null);
    }

    /** Represents an Event. */
    class Event implements IEvent {

        /**
         * Constructs a new Event.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IEvent);

        /** Event streamId. */
        public streamId: (number|Long);

        /** Event request. */
        public request?: (ritp.IRequest|null);

        /** Event chunk. */
        public chunk: Uint8Array;

        /** Event end. */
        public end?: (ritp.IEnd|null);

        /** Event type. */
        public type?: ("request"|"chunk"|"end");

        /**
         * Creates a new Event instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Event instance
         */
        public static create(properties?: ritp.IEvent): ritp.Event;

        /**
         * Encodes the specified Event message. Does not implicitly {@link ritp.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link ritp.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.Event;

        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.Event;

        /**
         * Verifies an Event message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Event
         */
        public static fromObject(object: { [k: string]: any }): ritp.Event;

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @param message Event
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.Event, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Event to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Request. */
    interface IRequest {

        /** Request handlerName */
        handlerName?: (string|null);

        /** Request data */
        data?: (Uint8Array|null);
    }

    /** Represents a Request. */
    class Request implements IRequest {

        /**
         * Constructs a new Request.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IRequest);

        /** Request handlerName. */
        public handlerName: string;

        /** Request data. */
        public data: Uint8Array;

        /**
         * Creates a new Request instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Request instance
         */
        public static create(properties?: ritp.IRequest): ritp.Request;

        /**
         * Encodes the specified Request message. Does not implicitly {@link ritp.Request.verify|verify} messages.
         * @param message Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Request message, length delimited. Does not implicitly {@link ritp.Request.verify|verify} messages.
         * @param message Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.Request;

        /**
         * Decodes a Request message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.Request;

        /**
         * Verifies a Request message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Request message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Request
         */
        public static fromObject(object: { [k: string]: any }): ritp.Request;

        /**
         * Creates a plain object from a Request message. Also converts values to other types if specified.
         * @param message Request
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Request to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an End. */
    interface IEnd {

        /** End reason */
        reason?: (ritp.End.Reason|null);

        /** End detail */
        detail?: (string|null);
    }

    /** Represents an End. */
    class End implements IEnd {

        /**
         * Constructs a new End.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IEnd);

        /** End reason. */
        public reason: ritp.End.Reason;

        /** End detail. */
        public detail: string;

        /**
         * Creates a new End instance using the specified properties.
         * @param [properties] Properties to set
         * @returns End instance
         */
        public static create(properties?: ritp.IEnd): ritp.End;

        /**
         * Encodes the specified End message. Does not implicitly {@link ritp.End.verify|verify} messages.
         * @param message End message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified End message, length delimited. Does not implicitly {@link ritp.End.verify|verify} messages.
         * @param message End message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an End message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns End
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.End;

        /**
         * Decodes an End message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns End
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.End;

        /**
         * Verifies an End message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an End message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns End
         */
        public static fromObject(object: { [k: string]: any }): ritp.End;

        /**
         * Creates a plain object from an End message. Also converts values to other types if specified.
         * @param message End
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.End, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this End to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace End {

        /** Reason enum. */
        enum Reason {
            FINISH = 0,
            CANCEL = 1
        }
    }

    /** Properties of a Control. */
    interface IControl {

        /** Control streamId */
        streamId?: (number|Long|null);

        /** Control pull */
        pull?: (number|null);

        /** Control close */
        close?: (ritp.IClose|null);
    }

    /** Represents a Control. */
    class Control implements IControl {

        /**
         * Constructs a new Control.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IControl);

        /** Control streamId. */
        public streamId: (number|Long);

        /** Control pull. */
        public pull: number;

        /** Control close. */
        public close?: (ritp.IClose|null);

        /** Control type. */
        public type?: ("pull"|"close");

        /**
         * Creates a new Control instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Control instance
         */
        public static create(properties?: ritp.IControl): ritp.Control;

        /**
         * Encodes the specified Control message. Does not implicitly {@link ritp.Control.verify|verify} messages.
         * @param message Control message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Control message, length delimited. Does not implicitly {@link ritp.Control.verify|verify} messages.
         * @param message Control message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Control message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Control
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.Control;

        /**
         * Decodes a Control message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Control
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.Control;

        /**
         * Verifies a Control message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Control message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Control
         */
        public static fromObject(object: { [k: string]: any }): ritp.Control;

        /**
         * Creates a plain object from a Control message. Also converts values to other types if specified.
         * @param message Control
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.Control, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Control to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Close. */
    interface IClose {

        /** Close reason */
        reason?: (ritp.Close.Reason|null);

        /** Close detail */
        detail?: (string|null);
    }

    /** Represents a Close. */
    class Close implements IClose {

        /**
         * Constructs a new Close.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IClose);

        /** Close reason. */
        public reason: ritp.Close.Reason;

        /** Close detail. */
        public detail: string;

        /**
         * Creates a new Close instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Close instance
         */
        public static create(properties?: ritp.IClose): ritp.Close;

        /**
         * Encodes the specified Close message. Does not implicitly {@link ritp.Close.verify|verify} messages.
         * @param message Close message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IClose, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Close message, length delimited. Does not implicitly {@link ritp.Close.verify|verify} messages.
         * @param message Close message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IClose, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Close message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Close
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.Close;

        /**
         * Decodes a Close message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Close
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.Close;

        /**
         * Verifies a Close message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Close message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Close
         */
        public static fromObject(object: { [k: string]: any }): ritp.Close;

        /**
         * Creates a plain object from a Close message. Also converts values to other types if specified.
         * @param message Close
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.Close, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Close to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Close {

        /** Reason enum. */
        enum Reason {
            ABORT = 0,
            APPLICATION_ERROR = 1,
            PROTOCOL_ERROR = 2
        }
    }
}
