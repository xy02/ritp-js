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

    ritp.PeerInfo = (function() {

        /**
         * Properties of a PeerInfo.
         * @memberof ritp
         * @interface IPeerInfo
         * @property {string|null} [version] PeerInfo version
         * @property {Uint8Array|null} [info] PeerInfo info
         * @property {string|null} [infoType] PeerInfo infoType
         */

        /**
         * Constructs a new PeerInfo.
         * @memberof ritp
         * @classdesc Represents a PeerInfo.
         * @implements IPeerInfo
         * @constructor
         * @param {ritp.IPeerInfo=} [properties] Properties to set
         */
        function PeerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PeerInfo version.
         * @member {string} version
         * @memberof ritp.PeerInfo
         * @instance
         */
        PeerInfo.prototype.version = "";

        /**
         * PeerInfo info.
         * @member {Uint8Array} info
         * @memberof ritp.PeerInfo
         * @instance
         */
        PeerInfo.prototype.info = $util.newBuffer([]);

        /**
         * PeerInfo infoType.
         * @member {string} infoType
         * @memberof ritp.PeerInfo
         * @instance
         */
        PeerInfo.prototype.infoType = "";

        /**
         * Creates a new PeerInfo instance using the specified properties.
         * @function create
         * @memberof ritp.PeerInfo
         * @static
         * @param {ritp.IPeerInfo=} [properties] Properties to set
         * @returns {ritp.PeerInfo} PeerInfo instance
         */
        PeerInfo.create = function create(properties) {
            return new PeerInfo(properties);
        };

        /**
         * Encodes the specified PeerInfo message. Does not implicitly {@link ritp.PeerInfo.verify|verify} messages.
         * @function encode
         * @memberof ritp.PeerInfo
         * @static
         * @param {ritp.IPeerInfo} message PeerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PeerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.info);
            if (message.infoType != null && Object.hasOwnProperty.call(message, "infoType"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.infoType);
            return writer;
        };

        /**
         * Encodes the specified PeerInfo message, length delimited. Does not implicitly {@link ritp.PeerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.PeerInfo
         * @static
         * @param {ritp.IPeerInfo} message PeerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PeerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PeerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.PeerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.PeerInfo} PeerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PeerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.PeerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.string();
                    break;
                case 2:
                    message.info = reader.bytes();
                    break;
                case 3:
                    message.infoType = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PeerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.PeerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.PeerInfo} PeerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PeerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PeerInfo message.
         * @function verify
         * @memberof ritp.PeerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PeerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.info != null && message.hasOwnProperty("info"))
                if (!(message.info && typeof message.info.length === "number" || $util.isString(message.info)))
                    return "info: buffer expected";
            if (message.infoType != null && message.hasOwnProperty("infoType"))
                if (!$util.isString(message.infoType))
                    return "infoType: string expected";
            return null;
        };

        /**
         * Creates a PeerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.PeerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.PeerInfo} PeerInfo
         */
        PeerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.PeerInfo)
                return object;
            var message = new $root.ritp.PeerInfo();
            if (object.version != null)
                message.version = String(object.version);
            if (object.info != null)
                if (typeof object.info === "string")
                    $util.base64.decode(object.info, message.info = $util.newBuffer($util.base64.length(object.info)), 0);
                else if (object.info.length)
                    message.info = object.info;
            if (object.infoType != null)
                message.infoType = String(object.infoType);
            return message;
        };

        /**
         * Creates a plain object from a PeerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.PeerInfo
         * @static
         * @param {ritp.PeerInfo} message PeerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PeerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = "";
                if (options.bytes === String)
                    object.info = "";
                else {
                    object.info = [];
                    if (options.bytes !== Array)
                        object.info = $util.newBuffer(object.info);
                }
                object.infoType = "";
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.info != null && message.hasOwnProperty("info"))
                object.info = options.bytes === String ? $util.base64.encode(message.info, 0, message.info.length) : options.bytes === Array ? Array.prototype.slice.call(message.info) : message.info;
            if (message.infoType != null && message.hasOwnProperty("infoType"))
                object.infoType = message.infoType;
            return object;
        };

        /**
         * Converts this PeerInfo to JSON.
         * @function toJSON
         * @memberof ritp.PeerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PeerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PeerInfo;
    })();

    ritp.Frame = (function() {

        /**
         * Properties of a Frame.
         * @memberof ritp
         * @interface IFrame
         * @property {ritp.IDisconnect|null} [disconnect] Frame disconnect
         * @property {number|null} [pull] Frame pull
         * @property {ritp.IEvent|null} [event] Frame event
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
         * Frame disconnect.
         * @member {ritp.IDisconnect|null|undefined} disconnect
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.disconnect = null;

        /**
         * Frame pull.
         * @member {number} pull
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.pull = 0;

        /**
         * Frame event.
         * @member {ritp.IEvent|null|undefined} event
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.event = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Frame type.
         * @member {"disconnect"|"pull"|"event"|undefined} type
         * @memberof ritp.Frame
         * @instance
         */
        Object.defineProperty(Frame.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["disconnect", "pull", "event"]),
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
            if (message.disconnect != null && Object.hasOwnProperty.call(message, "disconnect"))
                $root.ritp.Disconnect.encode(message.disconnect, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.pull != null && Object.hasOwnProperty.call(message, "pull"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pull);
            if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                $root.ritp.Event.encode(message.event, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
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
                    message.disconnect = $root.ritp.Disconnect.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.pull = reader.uint32();
                    break;
                case 3:
                    message.event = $root.ritp.Event.decode(reader, reader.uint32());
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
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                properties.type = 1;
                {
                    var error = $root.ritp.Disconnect.verify(message.disconnect);
                    if (error)
                        return "disconnect." + error;
                }
            }
            if (message.pull != null && message.hasOwnProperty("pull")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                if (!$util.isInteger(message.pull))
                    return "pull: integer expected";
            }
            if (message.event != null && message.hasOwnProperty("event")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                {
                    var error = $root.ritp.Event.verify(message.event);
                    if (error)
                        return "event." + error;
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
            if (object.disconnect != null) {
                if (typeof object.disconnect !== "object")
                    throw TypeError(".ritp.Frame.disconnect: object expected");
                message.disconnect = $root.ritp.Disconnect.fromObject(object.disconnect);
            }
            if (object.pull != null)
                message.pull = object.pull >>> 0;
            if (object.event != null) {
                if (typeof object.event !== "object")
                    throw TypeError(".ritp.Frame.event: object expected");
                message.event = $root.ritp.Event.fromObject(object.event);
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
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                object.disconnect = $root.ritp.Disconnect.toObject(message.disconnect, options);
                if (options.oneofs)
                    object.type = "disconnect";
            }
            if (message.pull != null && message.hasOwnProperty("pull")) {
                object.pull = message.pull;
                if (options.oneofs)
                    object.type = "pull";
            }
            if (message.event != null && message.hasOwnProperty("event")) {
                object.event = $root.ritp.Event.toObject(message.event, options);
                if (options.oneofs)
                    object.type = "event";
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

    ritp.Disconnect = (function() {

        /**
         * Properties of a Disconnect.
         * @memberof ritp
         * @interface IDisconnect
         */

        /**
         * Constructs a new Disconnect.
         * @memberof ritp
         * @classdesc Represents a Disconnect.
         * @implements IDisconnect
         * @constructor
         * @param {ritp.IDisconnect=} [properties] Properties to set
         */
        function Disconnect(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Disconnect instance using the specified properties.
         * @function create
         * @memberof ritp.Disconnect
         * @static
         * @param {ritp.IDisconnect=} [properties] Properties to set
         * @returns {ritp.Disconnect} Disconnect instance
         */
        Disconnect.create = function create(properties) {
            return new Disconnect(properties);
        };

        /**
         * Encodes the specified Disconnect message. Does not implicitly {@link ritp.Disconnect.verify|verify} messages.
         * @function encode
         * @memberof ritp.Disconnect
         * @static
         * @param {ritp.IDisconnect} message Disconnect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Disconnect.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link ritp.Disconnect.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Disconnect
         * @static
         * @param {ritp.IDisconnect} message Disconnect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Disconnect.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Disconnect message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Disconnect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Disconnect} Disconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Disconnect.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Disconnect();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Disconnect message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Disconnect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Disconnect} Disconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Disconnect.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Disconnect message.
         * @function verify
         * @memberof ritp.Disconnect
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Disconnect.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Disconnect
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Disconnect} Disconnect
         */
        Disconnect.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Disconnect)
                return object;
            return new $root.ritp.Disconnect();
        };

        /**
         * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Disconnect
         * @static
         * @param {ritp.Disconnect} message Disconnect
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Disconnect.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Disconnect to JSON.
         * @function toJSON
         * @memberof ritp.Disconnect
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Disconnect.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Disconnect;
    })();

    ritp.Event = (function() {

        /**
         * Properties of an Event.
         * @memberof ritp
         * @interface IEvent
         * @property {number|null} [streamId] Event streamId
         * @property {ritp.IRequest|null} [request] Event request
         * @property {ritp.IClose|null} [close] Event close
         * @property {number|null} [pull] Event pull
         * @property {Uint8Array|null} [buf] Event buf
         * @property {ritp.IEnd|null} [end] Event end
         */

        /**
         * Constructs a new Event.
         * @memberof ritp
         * @classdesc Represents an Event.
         * @implements IEvent
         * @constructor
         * @param {ritp.IEvent=} [properties] Properties to set
         */
        function Event(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Event streamId.
         * @member {number} streamId
         * @memberof ritp.Event
         * @instance
         */
        Event.prototype.streamId = 0;

        /**
         * Event request.
         * @member {ritp.IRequest|null|undefined} request
         * @memberof ritp.Event
         * @instance
         */
        Event.prototype.request = null;

        /**
         * Event close.
         * @member {ritp.IClose|null|undefined} close
         * @memberof ritp.Event
         * @instance
         */
        Event.prototype.close = null;

        /**
         * Event pull.
         * @member {number} pull
         * @memberof ritp.Event
         * @instance
         */
        Event.prototype.pull = 0;

        /**
         * Event buf.
         * @member {Uint8Array} buf
         * @memberof ritp.Event
         * @instance
         */
        Event.prototype.buf = $util.newBuffer([]);

        /**
         * Event end.
         * @member {ritp.IEnd|null|undefined} end
         * @memberof ritp.Event
         * @instance
         */
        Event.prototype.end = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Event type.
         * @member {"request"|"close"|"pull"|"buf"|"end"|undefined} type
         * @memberof ritp.Event
         * @instance
         */
        Object.defineProperty(Event.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["request", "close", "pull", "buf", "end"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Event instance using the specified properties.
         * @function create
         * @memberof ritp.Event
         * @static
         * @param {ritp.IEvent=} [properties] Properties to set
         * @returns {ritp.Event} Event instance
         */
        Event.create = function create(properties) {
            return new Event(properties);
        };

        /**
         * Encodes the specified Event message. Does not implicitly {@link ritp.Event.verify|verify} messages.
         * @function encode
         * @memberof ritp.Event
         * @static
         * @param {ritp.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.streamId != null && Object.hasOwnProperty.call(message, "streamId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.streamId);
            if (message.request != null && Object.hasOwnProperty.call(message, "request"))
                $root.ritp.Request.encode(message.request, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
         * Encodes the specified Event message, length delimited. Does not implicitly {@link ritp.Event.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Event
         * @static
         * @param {ritp.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Event();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.streamId = reader.uint32();
                    break;
                case 2:
                    message.request = $root.ritp.Request.decode(reader, reader.uint32());
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
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Event message.
         * @function verify
         * @memberof ritp.Event
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Event.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (!$util.isInteger(message.streamId))
                    return "streamId: integer expected";
            if (message.request != null && message.hasOwnProperty("request")) {
                properties.type = 1;
                {
                    var error = $root.ritp.Request.verify(message.request);
                    if (error)
                        return "request." + error;
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
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Event
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Event} Event
         */
        Event.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Event)
                return object;
            var message = new $root.ritp.Event();
            if (object.streamId != null)
                message.streamId = object.streamId >>> 0;
            if (object.request != null) {
                if (typeof object.request !== "object")
                    throw TypeError(".ritp.Event.request: object expected");
                message.request = $root.ritp.Request.fromObject(object.request);
            }
            if (object.close != null) {
                if (typeof object.close !== "object")
                    throw TypeError(".ritp.Event.close: object expected");
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
                    throw TypeError(".ritp.Event.end: object expected");
                message.end = $root.ritp.End.fromObject(object.end);
            }
            return message;
        };

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Event
         * @static
         * @param {ritp.Event} message Event
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Event.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.streamId = 0;
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                object.streamId = message.streamId;
            if (message.request != null && message.hasOwnProperty("request")) {
                object.request = $root.ritp.Request.toObject(message.request, options);
                if (options.oneofs)
                    object.type = "request";
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
         * Converts this Event to JSON.
         * @function toJSON
         * @memberof ritp.Event
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Event.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Event;
    })();

    ritp.Request = (function() {

        /**
         * Properties of a Request.
         * @memberof ritp
         * @interface IRequest
         * @property {string|null} [path] Request path
         * @property {Uint8Array|null} [info] Request info
         * @property {string|null} [infoType] Request infoType
         * @property {string|null} [bufType] Request bufType
         */

        /**
         * Constructs a new Request.
         * @memberof ritp
         * @classdesc Represents a Request.
         * @implements IRequest
         * @constructor
         * @param {ritp.IRequest=} [properties] Properties to set
         */
        function Request(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Request path.
         * @member {string} path
         * @memberof ritp.Request
         * @instance
         */
        Request.prototype.path = "";

        /**
         * Request info.
         * @member {Uint8Array} info
         * @memberof ritp.Request
         * @instance
         */
        Request.prototype.info = $util.newBuffer([]);

        /**
         * Request infoType.
         * @member {string} infoType
         * @memberof ritp.Request
         * @instance
         */
        Request.prototype.infoType = "";

        /**
         * Request bufType.
         * @member {string} bufType
         * @memberof ritp.Request
         * @instance
         */
        Request.prototype.bufType = "";

        /**
         * Creates a new Request instance using the specified properties.
         * @function create
         * @memberof ritp.Request
         * @static
         * @param {ritp.IRequest=} [properties] Properties to set
         * @returns {ritp.Request} Request instance
         */
        Request.create = function create(properties) {
            return new Request(properties);
        };

        /**
         * Encodes the specified Request message. Does not implicitly {@link ritp.Request.verify|verify} messages.
         * @function encode
         * @memberof ritp.Request
         * @static
         * @param {ritp.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.info);
            if (message.infoType != null && Object.hasOwnProperty.call(message, "infoType"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.infoType);
            if (message.bufType != null && Object.hasOwnProperty.call(message, "bufType"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.bufType);
            return writer;
        };

        /**
         * Encodes the specified Request message, length delimited. Does not implicitly {@link ritp.Request.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Request
         * @static
         * @param {ritp.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Request();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.path = reader.string();
                    break;
                case 2:
                    message.info = reader.bytes();
                    break;
                case 3:
                    message.infoType = reader.string();
                    break;
                case 4:
                    message.bufType = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Request message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Request message.
         * @function verify
         * @memberof ritp.Request
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Request.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.path != null && message.hasOwnProperty("path"))
                if (!$util.isString(message.path))
                    return "path: string expected";
            if (message.info != null && message.hasOwnProperty("info"))
                if (!(message.info && typeof message.info.length === "number" || $util.isString(message.info)))
                    return "info: buffer expected";
            if (message.infoType != null && message.hasOwnProperty("infoType"))
                if (!$util.isString(message.infoType))
                    return "infoType: string expected";
            if (message.bufType != null && message.hasOwnProperty("bufType"))
                if (!$util.isString(message.bufType))
                    return "bufType: string expected";
            return null;
        };

        /**
         * Creates a Request message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Request
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Request} Request
         */
        Request.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Request)
                return object;
            var message = new $root.ritp.Request();
            if (object.path != null)
                message.path = String(object.path);
            if (object.info != null)
                if (typeof object.info === "string")
                    $util.base64.decode(object.info, message.info = $util.newBuffer($util.base64.length(object.info)), 0);
                else if (object.info.length)
                    message.info = object.info;
            if (object.infoType != null)
                message.infoType = String(object.infoType);
            if (object.bufType != null)
                message.bufType = String(object.bufType);
            return message;
        };

        /**
         * Creates a plain object from a Request message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Request
         * @static
         * @param {ritp.Request} message Request
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Request.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.path = "";
                if (options.bytes === String)
                    object.info = "";
                else {
                    object.info = [];
                    if (options.bytes !== Array)
                        object.info = $util.newBuffer(object.info);
                }
                object.infoType = "";
                object.bufType = "";
            }
            if (message.path != null && message.hasOwnProperty("path"))
                object.path = message.path;
            if (message.info != null && message.hasOwnProperty("info"))
                object.info = options.bytes === String ? $util.base64.encode(message.info, 0, message.info.length) : options.bytes === Array ? Array.prototype.slice.call(message.info) : message.info;
            if (message.infoType != null && message.hasOwnProperty("infoType"))
                object.infoType = message.infoType;
            if (message.bufType != null && message.hasOwnProperty("bufType"))
                object.bufType = message.bufType;
            return object;
        };

        /**
         * Converts this Request to JSON.
         * @function toJSON
         * @memberof ritp.Request
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Request.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Request;
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
