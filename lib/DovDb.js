"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lodash = require("lodash");
var DovDbKey_1 = require("./DovDbKey");
var DovDb = /** @class */ (function () {
    function DovDb(adapter) {
        this.schemas = new Object();
        this.adapter = adapter;
        var serializedSchemas = this.adapter.get();
        if (!Lodash.isEmpty(serializedSchemas)) {
            this.defaults(serializedSchemas);
        }
    }
    DovDb.prototype.defaults = function (serializedSchemas) {
        this.schemas = this.unserialize(serializedSchemas);
    };
    DovDb.prototype.key = function (key, ttl, once) {
        if (ttl === void 0) { ttl = undefined; }
        if (once === void 0) { once = true; }
        var dovDbKey = new DovDbKey_1.default(this.schemas, key, ttl, once);
        return dovDbKey.getValues();
    };
    DovDb.prototype.save = function () {
        this.adapter.set(this.serialize());
    };
    DovDb.prototype.serialize = function () {
        return JSON.stringify(this.schemas);
    };
    DovDb.prototype.unserialize = function (serializeString) {
        return JSON.parse(serializeString);
    };
    return DovDb;
}());
exports.default = DovDb;
