"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fs = require("fs");
var FileAdapter = /** @class */ (function () {
    function FileAdapter(filePath) {
        this.key = filePath;
    }
    FileAdapter.prototype.set = function (serializedSchemas) {
        Fs.writeFile(this.key, serializedSchemas, function () { });
    };
    FileAdapter.prototype.get = function () {
        return Fs.readFileSync(this.key).toString();
    };
    return FileAdapter;
}());
exports.default = FileAdapter;
