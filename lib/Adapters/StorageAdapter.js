"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StorageAdapter = /** @class */ (function () {
    function StorageAdapter(key) {
        this.key = key;
    }
    StorageAdapter.prototype.set = function (serializedSchemas) {
        localStorage.setItem(this.key, serializedSchemas);
    };
    StorageAdapter.prototype.get = function () {
        return localStorage.getItem(this.key);
    };
    return StorageAdapter;
}());
exports.default = StorageAdapter;
