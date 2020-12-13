"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseEtymology($, elt) {
    const etymologyHeader = $(elt)
        .prevAll(':header:contains("Etymology")')
        .first();
    if ($(etymologyHeader).length <= 0 ||
        $(etymologyHeader).next()[0].name !== "p" ||
        !$(etymologyHeader).next().text().trim().length)
        return "";
    let etymology = $(etymologyHeader).next().text().trim();
    return etymology;
}
exports.default = parseEtymology;
//# sourceMappingURL=etymology.js.map