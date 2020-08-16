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
         * @property {Uint8Array|null} [metadata] PeerInfo metadata
         * @property {Uint8Array|null} [chunk] PeerInfo chunk
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
         * PeerInfo metadata.
         * @member {Uint8Array} metadata
         * @memberof ritp.PeerInfo
         * @instance
         */
        PeerInfo.prototype.metadata = $util.newBuffer([]);

        /**
         * PeerInfo chunk.
         * @member {Uint8Array} chunk
         * @memberof ritp.PeerInfo
         * @instance
         */
        PeerInfo.prototype.chunk = $util.newBuffer([]);

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
            if (message.metadata != null && Object.hasOwnProperty.call(message, "metadata"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.metadata);
            if (message.chunk != null && Object.hasOwnProperty.call(message, "chunk"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.chunk);
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
                    message.metadata = reader.bytes();
                    break;
                case 3:
                    message.chunk = reader.bytes();
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
            if (message.metadata != null && message.hasOwnProperty("metadata"))
                if (!(message.metadata && typeof message.metadata.length === "number" || $util.isString(message.metadata)))
                    return "metadata: buffer expected";
            if (message.chunk != null && message.hasOwnProperty("chunk"))
                if (!(message.chunk && typeof message.chunk.length === "number" || $util.isString(message.chunk)))
                    return "chunk: buffer expected";
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
            if (object.metadata != null)
                if (typeof object.metadata === "string")
                    $util.base64.decode(object.metadata, message.metadata = $util.newBuffer($util.base64.length(object.metadata)), 0);
                else if (object.metadata.length)
                    message.metadata = object.metadata;
            if (object.chunk != null)
                if (typeof object.chunk === "string")
                    $util.base64.decode(object.chunk, message.chunk = $util.newBuffer($util.base64.length(object.chunk)), 0);
                else if (object.chunk.length)
                    message.chunk = object.chunk;
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
                    object.metadata = "";
                else {
                    object.metadata = [];
                    if (options.bytes !== Array)
                        object.metadata = $util.newBuffer(object.metadata);
                }
                if (options.bytes === String)
                    object.chunk = "";
                else {
                    object.chunk = [];
                    if (options.bytes !== Array)
                        object.chunk = $util.newBuffer(object.chunk);
                }
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.metadata != null && message.hasOwnProperty("metadata"))
                object.metadata = options.bytes === String ? $util.base64.encode(message.metadata, 0, message.metadata.length) : options.bytes === Array ? Array.prototype.slice.call(message.metadata) : message.metadata;
            if (message.chunk != null && message.hasOwnProperty("chunk"))
                object.chunk = options.bytes === String ? $util.base64.encode(message.chunk, 0, message.chunk.length) : options.bytes === Array ? Array.prototype.slice.call(message.chunk) : message.chunk;
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
         * @property {number|null} [pull] Frame pull
         * @property {ritp.IEvent|null} [event] Frame event
         * @property {ritp.IControl|null} [control] Frame control
         * @property {ritp.IDisconnect|null} [disconnect] Frame disconnect
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

        /**
         * Frame control.
         * @member {ritp.IControl|null|undefined} control
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.control = null;

        /**
         * Frame disconnect.
         * @member {ritp.IDisconnect|null|undefined} disconnect
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.disconnect = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Frame type.
         * @member {"pull"|"event"|"control"|"disconnect"|undefined} type
         * @memberof ritp.Frame
         * @instance
         */
        Object.defineProperty(Frame.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["pull", "event", "control", "disconnect"]),
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
            if (message.pull != null && Object.hasOwnProperty.call(message, "pull"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.pull);
            if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                $root.ritp.Event.encode(message.event, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.control != null && Object.hasOwnProperty.call(message, "control"))
                $root.ritp.Control.encode(message.control, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.disconnect != null && Object.hasOwnProperty.call(message, "disconnect"))
                $root.ritp.Disconnect.encode(message.disconnect, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
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
                    message.pull = reader.uint32();
                    break;
                case 2:
                    message.event = $root.ritp.Event.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.control = $root.ritp.Control.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.disconnect = $root.ritp.Disconnect.decode(reader, reader.uint32());
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
            if (message.pull != null && message.hasOwnProperty("pull")) {
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
            if (message.control != null && message.hasOwnProperty("control")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                {
                    var error = $root.ritp.Control.verify(message.control);
                    if (error)
                        return "control." + error;
                }
            }
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                {
                    var error = $root.ritp.Disconnect.verify(message.disconnect);
                    if (error)
                        return "disconnect." + error;
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
            if (object.pull != null)
                message.pull = object.pull >>> 0;
            if (object.event != null) {
                if (typeof object.event !== "object")
                    throw TypeError(".ritp.Frame.event: object expected");
                message.event = $root.ritp.Event.fromObject(object.event);
            }
            if (object.control != null) {
                if (typeof object.control !== "object")
                    throw TypeError(".ritp.Frame.control: object expected");
                message.control = $root.ritp.Control.fromObject(object.control);
            }
            if (object.disconnect != null) {
                if (typeof object.disconnect !== "object")
                    throw TypeError(".ritp.Frame.disconnect: object expected");
                message.disconnect = $root.ritp.Disconnect.fromObject(object.disconnect);
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
            if (message.control != null && message.hasOwnProperty("control")) {
                object.control = $root.ritp.Control.toObject(message.control, options);
                if (options.oneofs)
                    object.type = "control";
            }
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                object.disconnect = $root.ritp.Disconnect.toObject(message.disconnect, options);
                if (options.oneofs)
                    object.type = "disconnect";
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
         * @property {number|Long|null} [streamId] Event streamId
         * @property {ritp.IRequest|null} [request] Event request
         * @property {Uint8Array|null} [chunk] Event chunk
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
         * @member {number|Long} streamId
         * @memberof ritp.Event
         * @instance
         */
        Event.prototype.streamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Event request.
         * @member {ritp.IRequest|null|undefined} request
         * @memberof ritp.Event
         * @instance
         */
        Event.prototype.request = null;

        /**
         * Event chunk.
         * @member {Uint8Array} chunk
         * @memberof ritp.Event
         * @instance
         */
        Event.prototype.chunk = $util.newBuffer([]);

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
         * @member {"request"|"chunk"|"end"|undefined} type
         * @memberof ritp.Event
         * @instance
         */
        Object.defineProperty(Event.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["request", "chunk", "end"]),
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
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.streamId);
            if (message.request != null && Object.hasOwnProperty.call(message, "request"))
                $root.ritp.Request.encode(message.request, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.chunk != null && Object.hasOwnProperty.call(message, "chunk"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.chunk);
            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                $root.ritp.End.encode(message.end, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
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
                    message.streamId = reader.uint64();
                    break;
                case 2:
                    message.request = $root.ritp.Request.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.chunk = reader.bytes();
                    break;
                case 4:
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
                if (!$util.isInteger(message.streamId) && !(message.streamId && $util.isInteger(message.streamId.low) && $util.isInteger(message.streamId.high)))
                    return "streamId: integer|Long expected";
            if (message.request != null && message.hasOwnProperty("request")) {
                properties.type = 1;
                {
                    var error = $root.ritp.Request.verify(message.request);
                    if (error)
                        return "request." + error;
                }
            }
            if (message.chunk != null && message.hasOwnProperty("chunk")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                if (!(message.chunk && typeof message.chunk.length === "number" || $util.isString(message.chunk)))
                    return "chunk: buffer expected";
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
                if ($util.Long)
                    (message.streamId = $util.Long.fromValue(object.streamId)).unsigned = true;
                else if (typeof object.streamId === "string")
                    message.streamId = parseInt(object.streamId, 10);
                else if (typeof object.streamId === "number")
                    message.streamId = object.streamId;
                else if (typeof object.streamId === "object")
                    message.streamId = new $util.LongBits(object.streamId.low >>> 0, object.streamId.high >>> 0).toNumber(true);
            if (object.request != null) {
                if (typeof object.request !== "object")
                    throw TypeError(".ritp.Event.request: object expected");
                message.request = $root.ritp.Request.fromObject(object.request);
            }
            if (object.chunk != null)
                if (typeof object.chunk === "string")
                    $util.base64.decode(object.chunk, message.chunk = $util.newBuffer($util.base64.length(object.chunk)), 0);
                else if (object.chunk.length)
                    message.chunk = object.chunk;
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
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.streamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.streamId = options.longs === String ? "0" : 0;
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (typeof message.streamId === "number")
                    object.streamId = options.longs === String ? String(message.streamId) : message.streamId;
                else
                    object.streamId = options.longs === String ? $util.Long.prototype.toString.call(message.streamId) : options.longs === Number ? new $util.LongBits(message.streamId.low >>> 0, message.streamId.high >>> 0).toNumber(true) : message.streamId;
            if (message.request != null && message.hasOwnProperty("request")) {
                object.request = $root.ritp.Request.toObject(message.request, options);
                if (options.oneofs)
                    object.type = "request";
            }
            if (message.chunk != null && message.hasOwnProperty("chunk")) {
                object.chunk = options.bytes === String ? $util.base64.encode(message.chunk, 0, message.chunk.length) : options.bytes === Array ? Array.prototype.slice.call(message.chunk) : message.chunk;
                if (options.oneofs)
                    object.type = "chunk";
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
         * @property {string|null} [handlerName] Request handlerName
         * @property {Uint8Array|null} [data] Request data
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
         * Request handlerName.
         * @member {string} handlerName
         * @memberof ritp.Request
         * @instance
         */
        Request.prototype.handlerName = "";

        /**
         * Request data.
         * @member {Uint8Array} data
         * @memberof ritp.Request
         * @instance
         */
        Request.prototype.data = $util.newBuffer([]);

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
            if (message.handlerName != null && Object.hasOwnProperty.call(message, "handlerName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.handlerName);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
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
                    message.handlerName = reader.string();
                    break;
                case 2:
                    message.data = reader.bytes();
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
            if (message.handlerName != null && message.hasOwnProperty("handlerName"))
                if (!$util.isString(message.handlerName))
                    return "handlerName: string expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
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
            if (object.handlerName != null)
                message.handlerName = String(object.handlerName);
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
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
                object.handlerName = "";
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.handlerName != null && message.hasOwnProperty("handlerName"))
                object.handlerName = message.handlerName;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
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

    ritp.End = (function() {

        /**
         * Properties of an End.
         * @memberof ritp
         * @interface IEnd
         * @property {ritp.End.Reason|null} [reason] End reason
         * @property {string|null} [detail] End detail
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
         * End detail.
         * @member {string} detail
         * @memberof ritp.End
         * @instance
         */
        End.prototype.detail = "";

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
            if (message.detail != null && Object.hasOwnProperty.call(message, "detail"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.detail);
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
                    message.detail = reader.string();
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
            if (message.detail != null && message.hasOwnProperty("detail"))
                if (!$util.isString(message.detail))
                    return "detail: string expected";
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
            case "FINISH":
            case 0:
                message.reason = 0;
                break;
            case "CANCEL":
            case 1:
                message.reason = 1;
                break;
            }
            if (object.detail != null)
                message.detail = String(object.detail);
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
                object.reason = options.enums === String ? "FINISH" : 0;
                object.detail = "";
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.ritp.End.Reason[message.reason] : message.reason;
            if (message.detail != null && message.hasOwnProperty("detail"))
                object.detail = message.detail;
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
         * @property {number} FINISH=0 FINISH value
         * @property {number} CANCEL=1 CANCEL value
         */
        End.Reason = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "FINISH"] = 0;
            values[valuesById[1] = "CANCEL"] = 1;
            return values;
        })();

        return End;
    })();

    ritp.Control = (function() {

        /**
         * Properties of a Control.
         * @memberof ritp
         * @interface IControl
         * @property {number|Long|null} [streamId] Control streamId
         * @property {number|null} [pull] Control pull
         * @property {ritp.IClose|null} [close] Control close
         */

        /**
         * Constructs a new Control.
         * @memberof ritp
         * @classdesc Represents a Control.
         * @implements IControl
         * @constructor
         * @param {ritp.IControl=} [properties] Properties to set
         */
        function Control(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Control streamId.
         * @member {number|Long} streamId
         * @memberof ritp.Control
         * @instance
         */
        Control.prototype.streamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Control pull.
         * @member {number} pull
         * @memberof ritp.Control
         * @instance
         */
        Control.prototype.pull = 0;

        /**
         * Control close.
         * @member {ritp.IClose|null|undefined} close
         * @memberof ritp.Control
         * @instance
         */
        Control.prototype.close = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Control type.
         * @member {"pull"|"close"|undefined} type
         * @memberof ritp.Control
         * @instance
         */
        Object.defineProperty(Control.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["pull", "close"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Control instance using the specified properties.
         * @function create
         * @memberof ritp.Control
         * @static
         * @param {ritp.IControl=} [properties] Properties to set
         * @returns {ritp.Control} Control instance
         */
        Control.create = function create(properties) {
            return new Control(properties);
        };

        /**
         * Encodes the specified Control message. Does not implicitly {@link ritp.Control.verify|verify} messages.
         * @function encode
         * @memberof ritp.Control
         * @static
         * @param {ritp.IControl} message Control message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Control.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.streamId != null && Object.hasOwnProperty.call(message, "streamId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.streamId);
            if (message.pull != null && Object.hasOwnProperty.call(message, "pull"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pull);
            if (message.close != null && Object.hasOwnProperty.call(message, "close"))
                $root.ritp.Close.encode(message.close, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Control message, length delimited. Does not implicitly {@link ritp.Control.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Control
         * @static
         * @param {ritp.IControl} message Control message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Control.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Control message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Control
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Control} Control
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Control.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Control();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.streamId = reader.uint64();
                    break;
                case 2:
                    message.pull = reader.uint32();
                    break;
                case 3:
                    message.close = $root.ritp.Close.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Control message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Control
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Control} Control
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Control.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Control message.
         * @function verify
         * @memberof ritp.Control
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Control.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (!$util.isInteger(message.streamId) && !(message.streamId && $util.isInteger(message.streamId.low) && $util.isInteger(message.streamId.high)))
                    return "streamId: integer|Long expected";
            if (message.pull != null && message.hasOwnProperty("pull")) {
                properties.type = 1;
                if (!$util.isInteger(message.pull))
                    return "pull: integer expected";
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
            return null;
        };

        /**
         * Creates a Control message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Control
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Control} Control
         */
        Control.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Control)
                return object;
            var message = new $root.ritp.Control();
            if (object.streamId != null)
                if ($util.Long)
                    (message.streamId = $util.Long.fromValue(object.streamId)).unsigned = true;
                else if (typeof object.streamId === "string")
                    message.streamId = parseInt(object.streamId, 10);
                else if (typeof object.streamId === "number")
                    message.streamId = object.streamId;
                else if (typeof object.streamId === "object")
                    message.streamId = new $util.LongBits(object.streamId.low >>> 0, object.streamId.high >>> 0).toNumber(true);
            if (object.pull != null)
                message.pull = object.pull >>> 0;
            if (object.close != null) {
                if (typeof object.close !== "object")
                    throw TypeError(".ritp.Control.close: object expected");
                message.close = $root.ritp.Close.fromObject(object.close);
            }
            return message;
        };

        /**
         * Creates a plain object from a Control message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Control
         * @static
         * @param {ritp.Control} message Control
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Control.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.streamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.streamId = options.longs === String ? "0" : 0;
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (typeof message.streamId === "number")
                    object.streamId = options.longs === String ? String(message.streamId) : message.streamId;
                else
                    object.streamId = options.longs === String ? $util.Long.prototype.toString.call(message.streamId) : options.longs === Number ? new $util.LongBits(message.streamId.low >>> 0, message.streamId.high >>> 0).toNumber(true) : message.streamId;
            if (message.pull != null && message.hasOwnProperty("pull")) {
                object.pull = message.pull;
                if (options.oneofs)
                    object.type = "pull";
            }
            if (message.close != null && message.hasOwnProperty("close")) {
                object.close = $root.ritp.Close.toObject(message.close, options);
                if (options.oneofs)
                    object.type = "close";
            }
            return object;
        };

        /**
         * Converts this Control to JSON.
         * @function toJSON
         * @memberof ritp.Control
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Control.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Control;
    })();

    ritp.Close = (function() {

        /**
         * Properties of a Close.
         * @memberof ritp
         * @interface IClose
         * @property {ritp.Close.Reason|null} [reason] Close reason
         * @property {string|null} [detail] Close detail
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
         * Close detail.
         * @member {string} detail
         * @memberof ritp.Close
         * @instance
         */
        Close.prototype.detail = "";

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
            if (message.detail != null && Object.hasOwnProperty.call(message, "detail"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.detail);
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
                    message.detail = reader.string();
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
                case 2:
                    break;
                }
            if (message.detail != null && message.hasOwnProperty("detail"))
                if (!$util.isString(message.detail))
                    return "detail: string expected";
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
            case "ABORT":
            case 0:
                message.reason = 0;
                break;
            case "APPLICATION_ERROR":
            case 1:
                message.reason = 1;
                break;
            case "PROTOCOL_ERROR":
            case 2:
                message.reason = 2;
                break;
            }
            if (object.detail != null)
                message.detail = String(object.detail);
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
                object.reason = options.enums === String ? "ABORT" : 0;
                object.detail = "";
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.ritp.Close.Reason[message.reason] : message.reason;
            if (message.detail != null && message.hasOwnProperty("detail"))
                object.detail = message.detail;
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
         * @property {number} ABORT=0 ABORT value
         * @property {number} APPLICATION_ERROR=1 APPLICATION_ERROR value
         * @property {number} PROTOCOL_ERROR=2 PROTOCOL_ERROR value
         */
        Close.Reason = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ABORT"] = 0;
            values[valuesById[1] = "APPLICATION_ERROR"] = 1;
            values[valuesById[2] = "PROTOCOL_ERROR"] = 2;
            return values;
        })();

        return Close;
    })();

    return ritp;
})();

module.exports = $root;
