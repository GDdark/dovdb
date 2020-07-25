"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lodash = require("lodash");
exports.createExpiredAt = function (ttl) {
    if (ttl === void 0) { ttl = -1; }
    if (ttl <= 0) {
        return -1;
    }
    return Lodash.now() + ttl * 1000;
};
