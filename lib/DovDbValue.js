"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lodash = require("lodash");
var Helper_1 = require("./Helper");
var DovDbValue = /** @class */ (function () {
    function DovDbValue(values) {
        this.values = values;
    }
    DovDbValue.prototype.insert = function (value, ttl) {
        if (ttl === void 0) { ttl = -1; }
        if (!Lodash.isObject(value) || Lodash.isArray(value)) {
            return false;
        }
        this.values.push({ value: value, expiredAt: Helper_1.createExpiredAt(ttl) });
        return true;
    };
    DovDbValue.prototype.count = function (conditions) {
        return Lodash.filter(this.deleteExpiredValuesAndGetValues(), conditions).length;
    };
    DovDbValue.prototype.find = function (conditions) {
        return Lodash.filter(this.deleteExpiredValuesAndGetValues(), conditions);
    };
    DovDbValue.prototype.findFirst = function (conditions) {
        return Lodash.find(this.deleteExpiredValuesAndGetValues(), conditions);
    };
    DovDbValue.prototype.deleteExpiredValuesAndGetValues = function () {
        var currentTimestamp = Lodash.now();
        var results = [];
        var i = this.values.length;
        while (i--) {
            if (this.values[i].expiredAt >= 0 && currentTimestamp > this.values[i].expiredAt) {
                this.values.splice(i, 1);
            }
            else {
                results.push(this.values[i].value);
            }
        }
        return results;
    };
    return DovDbValue;
}());
exports.default = DovDbValue;
