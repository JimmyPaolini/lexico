"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = void 0;
function normalize(str) {
    if (!str)
        return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
exports.normalize = normalize;
//# sourceMappingURL=string.js.map