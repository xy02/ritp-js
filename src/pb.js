/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.ritp = (function() {

    /**
     * Namespace ritp.
     * @exports ritp
     * @namespace
     */
    var ritp = {};

    ritp.Frame = (function() {

        /**
         * Properties of a Frame.
         * @memberof ritp
         * @interface IFrame
         * @property {ritp.IInfo|null} [info] Frame info
         * @property {ritp.IClose|null} [close] Frame close
         * @property {number|null} [pull] Frame pull
         * @property {ritp.IMsg|null} [msg] Frame msg
         */

        /**
         * Constructs a new Frame.
         * @memberof ritp
         * @classdesc Represents a Frame.
         * @implements IFrame
         * @constructor
         * @param {ritp.IFrame=} [properties] Properties to set
         */
        function Frame(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Frame info.
         * @member {ritp.IInfo|null|undefined} info
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.info = null;

        /**
         * Frame close.
         * @member {ritp.IClose|null|undefined} close
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.close = null;

        /**
         * Frame pull.
         * @member {number} pull
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.pull = 0;

        /**
         * Frame msg.
         * @member {ritp.IMsg|null|undefined} msg
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.msg = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Frame type.
         * @member {"info"|"close"|"pull"|"msg"|undefined} type
         * @memberof ritp.Frame
         * @instance
         */
        Object.defineProperty(Frame.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["info", "close", "pull", "msg"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Frame instance using the specified properties.
         * @function create
         * @memberof ritp.Frame
         * @static
         * @param {ritp.IFrame=} [properties] Properties to set
         * @returns {ritp.Frame} Frame instance
         */
        Frame.create = function create(properties) {
            return new Frame(properties);
        };

        /**
         * Encodes the specified Frame message. Does not implicitly {@link ritp.Frame.verify|verify} messages.
         * @function encode
         * @memberof ritp.Frame
         * @static
         * @param {ritp.IFrame} message Frame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Frame.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                $root.ritp.Info.encode(message.info, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.close != null && Object.hasOwnProperty.call(message, "close"))
                $root.ritp.Close.encode(message.close, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.pull != null && Object.hasOwnProperty.call(message, "pull"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.pull);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                $root.ritp.Msg.encode(message.msg, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Frame message, length delimited. Does not implicitly {@link ritp.Frame.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Frame
         * @static
         * @param {ritp.IFrame} message Frame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Frame.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Frame message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Frame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Frame} Frame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Frame.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Frame();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.info = $root.ritp.Info.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.close = $root.ritp.Close.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.pull = reader.uint32();
                    break;
                case 4:
                    message.msg = $root.ritp.Msg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Frame message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Frame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Frame} Frame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Frame.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Frame message.
         * @function verify
         * @memberof ritp.Frame
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Frame.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.info != null && message.hasOwnProperty("info")) {
                properties.type = 1;
                {
                    var error = $root.ritp.Info.verify(message.info);
                    if (error)
                        return "info." + error;
                }
            }
            if (message.close != null && message.hasOwnProperty("close")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                {
                    var error = $root.ritp.Close.verify(message.close);
                    if (error)
                        return "close." + error;
                }
            }
            if (message.pull != null && message.hasOwnProperty("pull")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                if (!$util.isInteger(message.pull))
                    return "pull: integer expected";
            }
            if (message.msg != null && message.hasOwnProperty("msg")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                {
                    var error = $root.ritp.Msg.verify(message.msg);
                    if (error)
                        return "msg." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Frame message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Frame
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Frame} Frame
         */
        Frame.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Frame)
                return object;
            var message = new $root.ritp.Frame();
            if (object.info != null) {
                if (typeof object.info !== "object")
                    throw TypeError(".ritp.Frame.info: object expected");
                message.info = $root.ritp.Info.fromObject(object.info);
            }
            if (object.close != null) {
                if (typeof object.close !== "object")
                    throw TypeError(".ritp.Frame.close: object expected");
                message.close = $root.ritp.Close.fromObject(object.close);
            }
            if (object.pull != null)
                message.pull = object.pull >>> 0;
            if (object.msg != null) {
                if (typeof object.msg !== "object")
                    throw TypeError(".ritp.Frame.msg: object expected");
                message.msg = $root.ritp.Msg.fromObject(object.msg);
            }
            return message;
        };

        /**
         * Creates a plain object from a Frame message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Frame
         * @static
         * @param {ritp.Frame} message Frame
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Frame.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.info != null && message.hasOwnProperty("info")) {
                object.info = $root.ritp.Info.toObject(message.info, options);
                if (options.oneofs)
                    object.type = "info";
            }
            if (message.close != null && message.hasOwnProperty("close")) {
                object.close = $root.ritp.Close.toObject(message.close, options);
                if (options.oneofs)
                    object.type = "close";
            }
            if (message.pull != null && message.hasOwnProperty("pull")) {
                object.pull = message.pull;
                if (options.oneofs)
                    object.type = "pull";
            }
            if (message.msg != null && message.hasOwnProperty("msg")) {
                object.msg = $root.ritp.Msg.toObject(message.msg, options);
                if (options.oneofs)
                    object.type = "msg";
            }
            return object;
        };

        /**
         * Converts this Frame to JSON.
         * @function toJSON
         * @memberof ritp.Frame
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Frame.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Frame;
    })();

    ritp.Info = (function() {

        /**
         * Properties of an Info.
         * @memberof ritp
         * @interface IInfo
         * @property {string|null} [version] Info version
         * @property {Uint8Array|null} [data] Info data
         * @property {string|null} [dataType] Info dataType
         */

        /**
         * Constructs a new Info.
         * @memberof ritp
         * @classdesc Represents an Info.
         * @implements IInfo
         * @constructor
         * @param {ritp.IInfo=} [properties] Properties to set
         */
        function Info(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Info version.
         * @member {string} version
         * @memberof ritp.Info
         * @instance
         */
        Info.prototype.version = "";

        /**
         * Info data.
         * @member {Uint8Array} data
         * @memberof ritp.Info
         * @instance
         */
        Info.prototype.data = $util.newBuffer([]);

        /**
         * Info dataType.
         * @member {string} dataType
         * @memberof ritp.Info
         * @instance
         */
        Info.prototype.dataType = "";

        /**
         * Creates a new Info instance using the specified properties.
         * @function create
         * @memberof ritp.Info
         * @static
         * @param {ritp.IInfo=} [properties] Properties to set
         * @returns {ritp.Info} Info instance
         */
        Info.create = function create(properties) {
            return new Info(properties);
        };

        /**
         * Encodes the specified Info message. Does not implicitly {@link ritp.Info.verify|verify} messages.
         * @function encode
         * @memberof ritp.Info
         * @static
         * @param {ritp.IInfo} message Info message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Info.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.dataType);
            return writer;
        };

        /**
         * Encodes the specified Info message, length delimited. Does not implicitly {@link ritp.Info.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Info
         * @static
         * @param {ritp.IInfo} message Info message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Info.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Info message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Info
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Info} Info
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Info.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Info();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.string();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.dataType = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Info message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Info
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Info} Info
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Info.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Info message.
         * @function verify
         * @memberof ritp.Info
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Info.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            if (message.dataType != null && message.hasOwnProperty("dataType"))
                if (!$util.isString(message.dataType))
                    return "dataType: string expected";
            return null;
        };

        /**
         * Creates an Info message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Info
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Info} Info
         */
        Info.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Info)
                return object;
            var message = new $root.ritp.Info();
            if (object.version != null)
                message.version = String(object.version);
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            if (object.dataType != null)
                message.dataType = String(object.dataType);
            return message;
        };

        /**
         * Creates a plain object from an Info message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Info
         * @static
         * @param {ritp.Info} message Info
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Info.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = "";
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.dataType = "";
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.dataType != null && message.hasOwnProperty("dataType"))
                object.dataType = message.dataType;
            return object;
        };

        /**
         * Converts this Info to JSON.
         * @function toJSON
         * @memberof ritp.Info
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Info.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Info;
    })();

    ritp.Close = (function() {

        /**
         * Properties of a Close.
         * @memberof ritp
         * @interface IClose
         * @property {ritp.Close.Reason|null} [reason] Close reason
         * @property {string|null} [message] Close message
         */

        /**
         * Constructs a new Close.
         * @memberof ritp
         * @classdesc Represents a Close.
         * @implements IClose
         * @constructor
         * @param {ritp.IClose=} [properties] Properties to set
         */
        function Close(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Close reason.
         * @member {ritp.Close.Reason} reason
         * @memberof ritp.Close
         * @instance
         */
        Close.prototype.reason = 0;

        /**
         * Close message.
         * @member {string} message
         * @memberof ritp.Close
         * @instance
         */
        Close.prototype.message = "";

        /**
         * Creates a new Close instance using the specified properties.
         * @function create
         * @memberof ritp.Close
         * @static
         * @param {ritp.IClose=} [properties] Properties to set
         * @returns {ritp.Close} Close instance
         */
        Close.create = function create(properties) {
            return new Close(properties);
        };

        /**
         * Encodes the specified Close message. Does not implicitly {@link ritp.Close.verify|verify} messages.
         * @function encode
         * @memberof ritp.Close
         * @static
         * @param {ritp.IClose} message Close message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Close.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.reason);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified Close message, length delimited. Does not implicitly {@link ritp.Close.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Close
         * @static
         * @param {ritp.IClose} message Close message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Close.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Close message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Close
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Close} Close
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Close.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Close();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reason = reader.int32();
                    break;
                case 2:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Close message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Close
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Close} Close
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Close.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Close message.
         * @function verify
         * @memberof ritp.Close
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Close.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                switch (message.reason) {
                default:
                    return "reason: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates a Close message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Close
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Close} Close
         */
        Close.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Close)
                return object;
            var message = new $root.ritp.Close();
            switch (object.reason) {
            case "APPLICATION_ERROR":
            case 0:
                message.reason = 0;
                break;
            case "PROTOCOL_ERROR":
            case 1:
                message.reason = 1;
                break;
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a Close message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Close
         * @static
         * @param {ritp.Close} message Close
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Close.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reason = options.enums === String ? "APPLICATION_ERROR" : 0;
                object.message = "";
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.ritp.Close.Reason[message.reason] : message.reason;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this Close to JSON.
         * @function toJSON
         * @memberof ritp.Close
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Close.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Reason enum.
         * @name ritp.Close.Reason
         * @enum {number}
         * @property {number} APPLICATION_ERROR=0 APPLICATION_ERROR value
         * @property {number} PROTOCOL_ERROR=1 PROTOCOL_ERROR value
         */
        Close.Reason = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "APPLICATION_ERROR"] = 0;
            values[valuesById[1] = "PROTOCOL_ERROR"] = 1;
            return values;
        })();

        return Close;
    })();

    ritp.Msg = (function() {

        /**
         * Properties of a Msg.
         * @memberof ritp
         * @interface IMsg
         * @property {number|null} [streamId] Msg streamId
         * @property {ritp.IHeader|null} [header] Msg header
         * @property {ritp.IClose|null} [close] Msg close
         * @property {number|null} [pull] Msg pull
         * @property {Uint8Array|null} [buf] Msg buf
         * @property {ritp.IEnd|null} [end] Msg end
         */

        /**
         * Constructs a new Msg.
         * @memberof ritp
         * @classdesc Represents a Msg.
         * @implements IMsg
         * @constructor
         * @param {ritp.IMsg=} [properties] Properties to set
         */
        function Msg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Msg streamId.
         * @member {number} streamId
         * @memberof ritp.Msg
         * @instance
         */
        Msg.prototype.streamId = 0;

        /**
         * Msg header.
         * @member {ritp.IHeader|null|undefined} header
         * @memberof ritp.Msg
         * @instance
         */
        Msg.prototype.header = null;

        /**
         * Msg close.
         * @member {ritp.IClose|null|undefined} close
         * @memberof ritp.Msg
         * @instance
         */
        Msg.prototype.close = null;

        /**
         * Msg pull.
         * @member {number} pull
         * @memberof ritp.Msg
         * @instance
         */
        Msg.prototype.pull = 0;

        /**
         * Msg buf.
         * @member {Uint8Array} buf
         * @memberof ritp.Msg
         * @instance
         */
        Msg.prototype.buf = $util.newBuffer([]);

        /**
         * Msg end.
         * @member {ritp.IEnd|null|undefined} end
         * @memberof ritp.Msg
         * @instance
         */
        Msg.prototype.end = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Msg type.
         * @member {"header"|"close"|"pull"|"buf"|"end"|undefined} type
         * @memberof ritp.Msg
         * @instance
         */
        Object.defineProperty(Msg.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["header", "close", "pull", "buf", "end"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Msg instance using the specified properties.
         * @function create
         * @memberof ritp.Msg
         * @static
         * @param {ritp.IMsg=} [properties] Properties to set
         * @returns {ritp.Msg} Msg instance
         */
        Msg.create = function create(properties) {
            return new Msg(properties);
        };

        /**
         * Encodes the specified Msg message. Does not implicitly {@link ritp.Msg.verify|verify} messages.
         * @function encode
         * @memberof ritp.Msg
         * @static
         * @param {ritp.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.streamId != null && Object.hasOwnProperty.call(message, "streamId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.streamId);
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.ritp.Header.encode(message.header, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.close != null && Object.hasOwnProperty.call(message, "close"))
                $root.ritp.Close.encode(message.close, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.pull != null && Object.hasOwnProperty.call(message, "pull"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.pull);
            if (message.buf != null && Object.hasOwnProperty.call(message, "buf"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.buf);
            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                $root.ritp.End.encode(message.end, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Msg message, length delimited. Does not implicitly {@link ritp.Msg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Msg
         * @static
         * @param {ritp.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Msg message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Msg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.streamId = reader.uint32();
                    break;
                case 2:
                    message.header = $root.ritp.Header.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.close = $root.ritp.Close.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.pull = reader.uint32();
                    break;
                case 5:
                    message.buf = reader.bytes();
                    break;
                case 6:
                    message.end = $root.ritp.End.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Msg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Msg message.
         * @function verify
         * @memberof ritp.Msg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Msg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (!$util.isInteger(message.streamId))
                    return "streamId: integer expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                properties.type = 1;
                {
                    var error = $root.ritp.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
            }
            if (message.close != null && message.hasOwnProperty("close")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                {
                    var error = $root.ritp.Close.verify(message.close);
                    if (error)
                        return "close." + error;
                }
            }
            if (message.pull != null && message.hasOwnProperty("pull")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                if (!$util.isInteger(message.pull))
                    return "pull: integer expected";
            }
            if (message.buf != null && message.hasOwnProperty("buf")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                if (!(message.buf && typeof message.buf.length === "number" || $util.isString(message.buf)))
                    return "buf: buffer expected";
            }
            if (message.end != null && message.hasOwnProperty("end")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                {
                    var error = $root.ritp.End.verify(message.end);
                    if (error)
                        return "end." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Msg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Msg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Msg} Msg
         */
        Msg.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Msg)
                return object;
            var message = new $root.ritp.Msg();
            if (object.streamId != null)
                message.streamId = object.streamId >>> 0;
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".ritp.Msg.header: object expected");
                message.header = $root.ritp.Header.fromObject(object.header);
            }
            if (object.close != null) {
                if (typeof object.close !== "object")
                    throw TypeError(".ritp.Msg.close: object expected");
                message.close = $root.ritp.Close.fromObject(object.close);
            }
            if (object.pull != null)
                message.pull = object.pull >>> 0;
            if (object.buf != null)
                if (typeof object.buf === "string")
                    $util.base64.decode(object.buf, message.buf = $util.newBuffer($util.base64.length(object.buf)), 0);
                else if (object.buf.length)
                    message.buf = object.buf;
            if (object.end != null) {
                if (typeof object.end !== "object")
                    throw TypeError(".ritp.Msg.end: object expected");
                message.end = $root.ritp.End.fromObject(object.end);
            }
            return message;
        };

        /**
         * Creates a plain object from a Msg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Msg
         * @static
         * @param {ritp.Msg} message Msg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Msg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.streamId = 0;
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                object.streamId = message.streamId;
            if (message.header != null && message.hasOwnProperty("header")) {
                object.header = $root.ritp.Header.toObject(message.header, options);
                if (options.oneofs)
                    object.type = "header";
            }
            if (message.close != null && message.hasOwnProperty("close")) {
                object.close = $root.ritp.Close.toObject(message.close, options);
                if (options.oneofs)
                    object.type = "close";
            }
            if (message.pull != null && message.hasOwnProperty("pull")) {
                object.pull = message.pull;
                if (options.oneofs)
                    object.type = "pull";
            }
            if (message.buf != null && message.hasOwnProperty("buf")) {
                object.buf = options.bytes === String ? $util.base64.encode(message.buf, 0, message.buf.length) : options.bytes === Array ? Array.prototype.slice.call(message.buf) : message.buf;
                if (options.oneofs)
                    object.type = "buf";
            }
            if (message.end != null && message.hasOwnProperty("end")) {
                object.end = $root.ritp.End.toObject(message.end, options);
                if (options.oneofs)
                    object.type = "end";
            }
            return object;
        };

        /**
         * Converts this Msg to JSON.
         * @function toJSON
         * @memberof ritp.Msg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Msg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Msg;
    })();

    ritp.Header = (function() {

        /**
         * Properties of a Header.
         * @memberof ritp
         * @interface IHeader
         * @property {string|null} [fn] Header fn
         * @property {Uint8Array|null} [data] Header data
         * @property {string|null} [dataType] Header dataType
         * @property {string|null} [bufType] Header bufType
         * @property {string|null} [replyTo] Header replyTo
         */

        /**
         * Constructs a new Header.
         * @memberof ritp
         * @classdesc Represents a Header.
         * @implements IHeader
         * @constructor
         * @param {ritp.IHeader=} [properties] Properties to set
         */
        function Header(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Header fn.
         * @member {string} fn
         * @memberof ritp.Header
         * @instance
         */
        Header.prototype.fn = "";

        /**
         * Header data.
         * @member {Uint8Array} data
         * @memberof ritp.Header
         * @instance
         */
        Header.prototype.data = $util.newBuffer([]);

        /**
         * Header dataType.
         * @member {string} dataType
         * @memberof ritp.Header
         * @instance
         */
        Header.prototype.dataType = "";

        /**
         * Header bufType.
         * @member {string} bufType
         * @memberof ritp.Header
         * @instance
         */
        Header.prototype.bufType = "";

        /**
         * Header replyTo.
         * @member {string} replyTo
         * @memberof ritp.Header
         * @instance
         */
        Header.prototype.replyTo = "";

        /**
         * Creates a new Header instance using the specified properties.
         * @function create
         * @memberof ritp.Header
         * @static
         * @param {ritp.IHeader=} [properties] Properties to set
         * @returns {ritp.Header} Header instance
         */
        Header.create = function create(properties) {
            return new Header(properties);
        };

        /**
         * Encodes the specified Header message. Does not implicitly {@link ritp.Header.verify|verify} messages.
         * @function encode
         * @memberof ritp.Header
         * @static
         * @param {ritp.IHeader} message Header message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Header.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fn != null && Object.hasOwnProperty.call(message, "fn"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.fn);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.dataType);
            if (message.bufType != null && Object.hasOwnProperty.call(message, "bufType"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.bufType);
            if (message.replyTo != null && Object.hasOwnProperty.call(message, "replyTo"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.replyTo);
            return writer;
        };

        /**
         * Encodes the specified Header message, length delimited. Does not implicitly {@link ritp.Header.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Header
         * @static
         * @param {ritp.IHeader} message Header message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Header.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Header message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Header
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Header} Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Header.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Header();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.fn = reader.string();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.dataType = reader.string();
                    break;
                case 4:
                    message.bufType = reader.string();
                    break;
                case 5:
                    message.replyTo = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Header message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Header
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Header} Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Header.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Header message.
         * @function verify
         * @memberof ritp.Header
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Header.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fn != null && message.hasOwnProperty("fn"))
                if (!$util.isString(message.fn))
                    return "fn: string expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            if (message.dataType != null && message.hasOwnProperty("dataType"))
                if (!$util.isString(message.dataType))
                    return "dataType: string expected";
            if (message.bufType != null && message.hasOwnProperty("bufType"))
                if (!$util.isString(message.bufType))
                    return "bufType: string expected";
            if (message.replyTo != null && message.hasOwnProperty("replyTo"))
                if (!$util.isString(message.replyTo))
                    return "replyTo: string expected";
            return null;
        };

        /**
         * Creates a Header message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Header
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Header} Header
         */
        Header.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Header)
                return object;
            var message = new $root.ritp.Header();
            if (object.fn != null)
                message.fn = String(object.fn);
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            if (object.dataType != null)
                message.dataType = String(object.dataType);
            if (object.bufType != null)
                message.bufType = String(object.bufType);
            if (object.replyTo != null)
                message.replyTo = String(object.replyTo);
            return message;
        };

        /**
         * Creates a plain object from a Header message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Header
         * @static
         * @param {ritp.Header} message Header
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Header.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.fn = "";
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.dataType = "";
                object.bufType = "";
                object.replyTo = "";
            }
            if (message.fn != null && message.hasOwnProperty("fn"))
                object.fn = message.fn;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.dataType != null && message.hasOwnProperty("dataType"))
                object.dataType = message.dataType;
            if (message.bufType != null && message.hasOwnProperty("bufType"))
                object.bufType = message.bufType;
            if (message.replyTo != null && message.hasOwnProperty("replyTo"))
                object.replyTo = message.replyTo;
            return object;
        };

        /**
         * Converts this Header to JSON.
         * @function toJSON
         * @memberof ritp.Header
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Header.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Header;
    })();

    ritp.End = (function() {

        /**
         * Properties of an End.
         * @memberof ritp
         * @interface IEnd
         * @property {ritp.End.Reason|null} [reason] End reason
         * @property {string|null} [message] End message
         */

        /**
         * Constructs a new End.
         * @memberof ritp
         * @classdesc Represents an End.
         * @implements IEnd
         * @constructor
         * @param {ritp.IEnd=} [properties] Properties to set
         */
        function End(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * End reason.
         * @member {ritp.End.Reason} reason
         * @memberof ritp.End
         * @instance
         */
        End.prototype.reason = 0;

        /**
         * End message.
         * @member {string} message
         * @memberof ritp.End
         * @instance
         */
        End.prototype.message = "";

        /**
         * Creates a new End instance using the specified properties.
         * @function create
         * @memberof ritp.End
         * @static
         * @param {ritp.IEnd=} [properties] Properties to set
         * @returns {ritp.End} End instance
         */
        End.create = function create(properties) {
            return new End(properties);
        };

        /**
         * Encodes the specified End message. Does not implicitly {@link ritp.End.verify|verify} messages.
         * @function encode
         * @memberof ritp.End
         * @static
         * @param {ritp.IEnd} message End message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        End.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.reason);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified End message, length delimited. Does not implicitly {@link ritp.End.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.End
         * @static
         * @param {ritp.IEnd} message End message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        End.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an End message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.End
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.End} End
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        End.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.End();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reason = reader.int32();
                    break;
                case 2:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an End message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.End
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.End} End
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        End.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an End message.
         * @function verify
         * @memberof ritp.End
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        End.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                switch (message.reason) {
                default:
                    return "reason: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates an End message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.End
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.End} End
         */
        End.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.End)
                return object;
            var message = new $root.ritp.End();
            switch (object.reason) {
            case "COMPLETE":
            case 0:
                message.reason = 0;
                break;
            case "CANCEL":
            case 1:
                message.reason = 1;
                break;
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an End message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.End
         * @static
         * @param {ritp.End} message End
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        End.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reason = options.enums === String ? "COMPLETE" : 0;
                object.message = "";
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.ritp.End.Reason[message.reason] : message.reason;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this End to JSON.
         * @function toJSON
         * @memberof ritp.End
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        End.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Reason enum.
         * @name ritp.End.Reason
         * @enum {number}
         * @property {number} COMPLETE=0 COMPLETE value
         * @property {number} CANCEL=1 CANCEL value
         */
        End.Reason = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "COMPLETE"] = 0;
            values[valuesById[1] = "CANCEL"] = 1;
            return values;
        })();

        return End;
    })();

    return ritp;
})();

module.exports = $root;
