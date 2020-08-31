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
         * @property {ritp.IRequest|null} [request] Frame request
         * @property {ritp.IControl|null} [control] Frame control
         * @property {ritp.IData|null} [data] Frame data
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
         * Frame request.
         * @member {ritp.IRequest|null|undefined} request
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.request = null;

        /**
         * Frame control.
         * @member {ritp.IControl|null|undefined} control
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.control = null;

        /**
         * Frame data.
         * @member {ritp.IData|null|undefined} data
         * @memberof ritp.Frame
         * @instance
         */
        Frame.prototype.data = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Frame type.
         * @member {"disconnect"|"pull"|"request"|"control"|"data"|undefined} type
         * @memberof ritp.Frame
         * @instance
         */
        Object.defineProperty(Frame.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["disconnect", "pull", "request", "control", "data"]),
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
            if (message.request != null && Object.hasOwnProperty.call(message, "request"))
                $root.ritp.Request.encode(message.request, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.control != null && Object.hasOwnProperty.call(message, "control"))
                $root.ritp.Control.encode(message.control, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                $root.ritp.Data.encode(message.data, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
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
                    message.request = $root.ritp.Request.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.control = $root.ritp.Control.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.data = $root.ritp.Data.decode(reader, reader.uint32());
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
            if (message.request != null && message.hasOwnProperty("request")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                {
                    var error = $root.ritp.Request.verify(message.request);
                    if (error)
                        return "request." + error;
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
            if (message.data != null && message.hasOwnProperty("data")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                {
                    var error = $root.ritp.Data.verify(message.data);
                    if (error)
                        return "data." + error;
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
            if (object.request != null) {
                if (typeof object.request !== "object")
                    throw TypeError(".ritp.Frame.request: object expected");
                message.request = $root.ritp.Request.fromObject(object.request);
            }
            if (object.control != null) {
                if (typeof object.control !== "object")
                    throw TypeError(".ritp.Frame.control: object expected");
                message.control = $root.ritp.Control.fromObject(object.control);
            }
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".ritp.Frame.data: object expected");
                message.data = $root.ritp.Data.fromObject(object.data);
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
            if (message.request != null && message.hasOwnProperty("request")) {
                object.request = $root.ritp.Request.toObject(message.request, options);
                if (options.oneofs)
                    object.type = "request";
            }
            if (message.control != null && message.hasOwnProperty("control")) {
                object.control = $root.ritp.Control.toObject(message.control, options);
                if (options.oneofs)
                    object.type = "control";
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                object.data = $root.ritp.Data.toObject(message.data, options);
                if (options.oneofs)
                    object.type = "data";
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

    ritp.Request = (function() {

        /**
         * Properties of a Request.
         * @memberof ritp
         * @interface IRequest
         * @property {number|Long|null} [streamId] Request streamId
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
         * Request streamId.
         * @member {number|Long} streamId
         * @memberof ritp.Request
         * @instance
         */
        Request.prototype.streamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
            if (message.streamId != null && Object.hasOwnProperty.call(message, "streamId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.streamId);
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.path);
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.info);
            if (message.infoType != null && Object.hasOwnProperty.call(message, "infoType"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.infoType);
            if (message.bufType != null && Object.hasOwnProperty.call(message, "bufType"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.bufType);
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
                    message.streamId = reader.uint64();
                    break;
                case 2:
                    message.path = reader.string();
                    break;
                case 3:
                    message.info = reader.bytes();
                    break;
                case 4:
                    message.infoType = reader.string();
                    break;
                case 5:
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
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (!$util.isInteger(message.streamId) && !(message.streamId && $util.isInteger(message.streamId.low) && $util.isInteger(message.streamId.high)))
                    return "streamId: integer|Long expected";
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
            if (object.streamId != null)
                if ($util.Long)
                    (message.streamId = $util.Long.fromValue(object.streamId)).unsigned = true;
                else if (typeof object.streamId === "string")
                    message.streamId = parseInt(object.streamId, 10);
                else if (typeof object.streamId === "number")
                    message.streamId = object.streamId;
                else if (typeof object.streamId === "object")
                    message.streamId = new $util.LongBits(object.streamId.low >>> 0, object.streamId.high >>> 0).toNumber(true);
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
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.streamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.streamId = options.longs === String ? "0" : 0;
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
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (typeof message.streamId === "number")
                    object.streamId = options.longs === String ? String(message.streamId) : message.streamId;
                else
                    object.streamId = options.longs === String ? $util.Long.prototype.toString.call(message.streamId) : options.longs === Number ? new $util.LongBits(message.streamId.low >>> 0, message.streamId.high >>> 0).toNumber(true) : message.streamId;
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

    ritp.Control = (function() {

        /**
         * Properties of a Control.
         * @memberof ritp
         * @interface IControl
         * @property {number|Long|null} [streamId] Control streamId
         * @property {ritp.IClose|null} [close] Control close
         * @property {number|null} [pull] Control pull
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
         * Control close.
         * @member {ritp.IClose|null|undefined} close
         * @memberof ritp.Control
         * @instance
         */
        Control.prototype.close = null;

        /**
         * Control pull.
         * @member {number} pull
         * @memberof ritp.Control
         * @instance
         */
        Control.prototype.pull = 0;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Control type.
         * @member {"close"|"pull"|undefined} type
         * @memberof ritp.Control
         * @instance
         */
        Object.defineProperty(Control.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["close", "pull"]),
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
            if (message.close != null && Object.hasOwnProperty.call(message, "close"))
                $root.ritp.Close.encode(message.close, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.pull != null && Object.hasOwnProperty.call(message, "pull"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.pull);
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
                    message.close = $root.ritp.Close.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.pull = reader.uint32();
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
            if (message.close != null && message.hasOwnProperty("close")) {
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
            if (object.close != null) {
                if (typeof object.close !== "object")
                    throw TypeError(".ritp.Control.close: object expected");
                message.close = $root.ritp.Close.fromObject(object.close);
            }
            if (object.pull != null)
                message.pull = object.pull >>> 0;
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

    ritp.Data = (function() {

        /**
         * Properties of a Data.
         * @memberof ritp
         * @interface IData
         * @property {number|Long|null} [streamId] Data streamId
         * @property {ritp.IEnd|null} [end] Data end
         * @property {Uint8Array|null} [buf] Data buf
         */

        /**
         * Constructs a new Data.
         * @memberof ritp
         * @classdesc Represents a Data.
         * @implements IData
         * @constructor
         * @param {ritp.IData=} [properties] Properties to set
         */
        function Data(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Data streamId.
         * @member {number|Long} streamId
         * @memberof ritp.Data
         * @instance
         */
        Data.prototype.streamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Data end.
         * @member {ritp.IEnd|null|undefined} end
         * @memberof ritp.Data
         * @instance
         */
        Data.prototype.end = null;

        /**
         * Data buf.
         * @member {Uint8Array} buf
         * @memberof ritp.Data
         * @instance
         */
        Data.prototype.buf = $util.newBuffer([]);

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Data type.
         * @member {"end"|"buf"|undefined} type
         * @memberof ritp.Data
         * @instance
         */
        Object.defineProperty(Data.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["end", "buf"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Data instance using the specified properties.
         * @function create
         * @memberof ritp.Data
         * @static
         * @param {ritp.IData=} [properties] Properties to set
         * @returns {ritp.Data} Data instance
         */
        Data.create = function create(properties) {
            return new Data(properties);
        };

        /**
         * Encodes the specified Data message. Does not implicitly {@link ritp.Data.verify|verify} messages.
         * @function encode
         * @memberof ritp.Data
         * @static
         * @param {ritp.IData} message Data message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Data.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.streamId != null && Object.hasOwnProperty.call(message, "streamId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.streamId);
            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                $root.ritp.End.encode(message.end, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.buf != null && Object.hasOwnProperty.call(message, "buf"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.buf);
            return writer;
        };

        /**
         * Encodes the specified Data message, length delimited. Does not implicitly {@link ritp.Data.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ritp.Data
         * @static
         * @param {ritp.IData} message Data message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Data message from the specified reader or buffer.
         * @function decode
         * @memberof ritp.Data
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ritp.Data} Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Data.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ritp.Data();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.streamId = reader.uint64();
                    break;
                case 2:
                    message.end = $root.ritp.End.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.buf = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Data message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ritp.Data
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ritp.Data} Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Data message.
         * @function verify
         * @memberof ritp.Data
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Data.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (!$util.isInteger(message.streamId) && !(message.streamId && $util.isInteger(message.streamId.low) && $util.isInteger(message.streamId.high)))
                    return "streamId: integer|Long expected";
            if (message.end != null && message.hasOwnProperty("end")) {
                properties.type = 1;
                {
                    var error = $root.ritp.End.verify(message.end);
                    if (error)
                        return "end." + error;
                }
            }
            if (message.buf != null && message.hasOwnProperty("buf")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                if (!(message.buf && typeof message.buf.length === "number" || $util.isString(message.buf)))
                    return "buf: buffer expected";
            }
            return null;
        };

        /**
         * Creates a Data message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ritp.Data
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ritp.Data} Data
         */
        Data.fromObject = function fromObject(object) {
            if (object instanceof $root.ritp.Data)
                return object;
            var message = new $root.ritp.Data();
            if (object.streamId != null)
                if ($util.Long)
                    (message.streamId = $util.Long.fromValue(object.streamId)).unsigned = true;
                else if (typeof object.streamId === "string")
                    message.streamId = parseInt(object.streamId, 10);
                else if (typeof object.streamId === "number")
                    message.streamId = object.streamId;
                else if (typeof object.streamId === "object")
                    message.streamId = new $util.LongBits(object.streamId.low >>> 0, object.streamId.high >>> 0).toNumber(true);
            if (object.end != null) {
                if (typeof object.end !== "object")
                    throw TypeError(".ritp.Data.end: object expected");
                message.end = $root.ritp.End.fromObject(object.end);
            }
            if (object.buf != null)
                if (typeof object.buf === "string")
                    $util.base64.decode(object.buf, message.buf = $util.newBuffer($util.base64.length(object.buf)), 0);
                else if (object.buf.length)
                    message.buf = object.buf;
            return message;
        };

        /**
         * Creates a plain object from a Data message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ritp.Data
         * @static
         * @param {ritp.Data} message Data
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Data.toObject = function toObject(message, options) {
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
            if (message.end != null && message.hasOwnProperty("end")) {
                object.end = $root.ritp.End.toObject(message.end, options);
                if (options.oneofs)
                    object.type = "end";
            }
            if (message.buf != null && message.hasOwnProperty("buf")) {
                object.buf = options.bytes === String ? $util.base64.encode(message.buf, 0, message.buf.length) : options.bytes === Array ? Array.prototype.slice.call(message.buf) : message.buf;
                if (options.oneofs)
                    object.type = "buf";
            }
            return object;
        };

        /**
         * Converts this Data to JSON.
         * @function toJSON
         * @memberof ritp.Data
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Data;
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
