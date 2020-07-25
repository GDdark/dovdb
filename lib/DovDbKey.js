"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lodash = require("lodash");
var Helper_1 = require("./Helper");
var DovDbValue_1 = require("./DovDbValue");
var DovDbKey = /** @class */ (function () {
    function DovDbKey(schemas, key, ttl, once) {
        this.schemas = schemas;
        this.key = key;
        if (!this.schemas[this.key]) {
            this.schemas[this.key] = {
                values: []
            };
        }
        this.schemas[this.key].key = key;
        this.schemas[this.key].expiredAt = Helper_1.createExpiredAt();
        if (Lodash.isNumber(ttl)) {
            this.setTtl(ttl, once);
        }
    }
    DovDbKey.prototype.setTtl = function (ttl, once) {
        if (once === void 0) { once = true; }
        if (ttl < 0) {
            console.warn('TTL must be greater than 0');
            return;
        }
        if (once && this.schemas[this.key].expiredAt !== -1) {
            return;
        }
        this.schemas[this.key].expiredAt = Helper_1.createExpiredAt(ttl);
        return this;
    };
    DovDbKey.prototype.getValues = function () {
        return new DovDbValue_1.default(this.schemas[this.key].values);
    };
    return DovDbKey;
}());
exports.default = DovDbKey;
