import * as $protobuf from "protobufjs";
/** Namespace ritp. */
export namespace ritp {

    /** Properties of a Frame. */
    interface IFrame {

        /** Frame info */
        info?: (ritp.IInfo|null);

        /** Frame close */
        close?: (ritp.IClose|null);

        /** Frame pull */
        pull?: (number|null);

        /** Frame msg */
        msg?: (ritp.IMsg|null);
    }

    /** Represents a Frame. */
    class Frame implements IFrame {

        /**
         * Constructs a new Frame.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IFrame);

        /** Frame info. */
        public info?: (ritp.IInfo|null);

        /** Frame close. */
        public close?: (ritp.IClose|null);

        /** Frame pull. */
        public pull: number;

        /** Frame msg. */
        public msg?: (ritp.IMsg|null);

        /** Frame type. */
        public type?: ("info"|"close"|"pull"|"msg");

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

    /** Properties of an Info. */
    interface IInfo {

        /** Info version */
        version?: (string|null);

        /** Info data */
        data?: (Uint8Array|null);

        /** Info dataType */
        dataType?: (string|null);
    }

    /** Represents an Info. */
    class Info implements IInfo {

        /**
         * Constructs a new Info.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IInfo);

        /** Info version. */
        public version: string;

        /** Info data. */
        public data: Uint8Array;

        /** Info dataType. */
        public dataType: string;

        /**
         * Creates a new Info instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Info instance
         */
        public static create(properties?: ritp.IInfo): ritp.Info;

        /**
         * Encodes the specified Info message. Does not implicitly {@link ritp.Info.verify|verify} messages.
         * @param message Info message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Info message, length delimited. Does not implicitly {@link ritp.Info.verify|verify} messages.
         * @param message Info message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Info message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Info
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.Info;

        /**
         * Decodes an Info message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Info
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.Info;

        /**
         * Verifies an Info message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Info message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Info
         */
        public static fromObject(object: { [k: string]: any }): ritp.Info;

        /**
         * Creates a plain object from an Info message. Also converts values to other types if specified.
         * @param message Info
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.Info, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Info to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Close. */
    interface IClose {

        /** Close reason */
        reason?: (ritp.Close.Reason|null);

        /** Close message */
        message?: (string|null);
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

        /** Close message. */
        public message: string;

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
            APPLICATION_ERROR = 0,
            PROTOCOL_ERROR = 1
        }
    }

    /** Properties of a Msg. */
    interface IMsg {

        /** Msg streamId */
        streamId?: (number|null);

        /** Msg header */
        header?: (ritp.IHeader|null);

        /** Msg close */
        close?: (ritp.IClose|null);

        /** Msg pull */
        pull?: (number|null);

        /** Msg buf */
        buf?: (Uint8Array|null);

        /** Msg end */
        end?: (ritp.IEnd|null);
    }

    /** Represents a Msg. */
    class Msg implements IMsg {

        /**
         * Constructs a new Msg.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IMsg);

        /** Msg streamId. */
        public streamId: number;

        /** Msg header. */
        public header?: (ritp.IHeader|null);

        /** Msg close. */
        public close?: (ritp.IClose|null);

        /** Msg pull. */
        public pull: number;

        /** Msg buf. */
        public buf: Uint8Array;

        /** Msg end. */
        public end?: (ritp.IEnd|null);

        /** Msg type. */
        public type?: ("header"|"close"|"pull"|"buf"|"end");

        /**
         * Creates a new Msg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Msg instance
         */
        public static create(properties?: ritp.IMsg): ritp.Msg;

        /**
         * Encodes the specified Msg message. Does not implicitly {@link ritp.Msg.verify|verify} messages.
         * @param message Msg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Msg message, length delimited. Does not implicitly {@link ritp.Msg.verify|verify} messages.
         * @param message Msg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Msg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.Msg;

        /**
         * Decodes a Msg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.Msg;

        /**
         * Verifies a Msg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Msg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Msg
         */
        public static fromObject(object: { [k: string]: any }): ritp.Msg;

        /**
         * Creates a plain object from a Msg message. Also converts values to other types if specified.
         * @param message Msg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.Msg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Msg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Header. */
    interface IHeader {

        /** Header fn */
        fn?: (string|null);

        /** Header data */
        data?: (Uint8Array|null);

        /** Header dataType */
        dataType?: (string|null);

        /** Header bufType */
        bufType?: (string|null);

        /** Header replyTo */
        replyTo?: (string|null);
    }

    /** Represents a Header. */
    class Header implements IHeader {

        /**
         * Constructs a new Header.
         * @param [properties] Properties to set
         */
        constructor(properties?: ritp.IHeader);

        /** Header fn. */
        public fn: string;

        /** Header data. */
        public data: Uint8Array;

        /** Header dataType. */
        public dataType: string;

        /** Header bufType. */
        public bufType: string;

        /** Header replyTo. */
        public replyTo: string;

        /**
         * Creates a new Header instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Header instance
         */
        public static create(properties?: ritp.IHeader): ritp.Header;

        /**
         * Encodes the specified Header message. Does not implicitly {@link ritp.Header.verify|verify} messages.
         * @param message Header message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ritp.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Header message, length delimited. Does not implicitly {@link ritp.Header.verify|verify} messages.
         * @param message Header message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ritp.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Header message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ritp.Header;

        /**
         * Decodes a Header message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ritp.Header;

        /**
         * Verifies a Header message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Header message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Header
         */
        public static fromObject(object: { [k: string]: any }): ritp.Header;

        /**
         * Creates a plain object from a Header message. Also converts values to other types if specified.
         * @param message Header
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ritp.Header, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Header to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an End. */
    interface IEnd {

        /** End reason */
        reason?: (ritp.End.Reason|null);

        /** End message */
        message?: (string|null);
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

        /** End message. */
        public message: string;

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
            COMPLETE = 0,
            CANCEL = 1
        }
    }
}
