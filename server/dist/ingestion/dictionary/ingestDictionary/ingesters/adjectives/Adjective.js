"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester_1 = __importDefault(require("../../Ingester"));
class Adjective extends Ingester_1.default {
    firstPrincipalPartName() {
        return "masculine";
    }
    ingestInflection($, elt) {
        const inflectionHtml = $(elt)
            .nextUntil("h3", ':header:contains("Declension")')
            .first()
            .next();
        if (!$(inflectionHtml).length)
            throw new Error(`no inflection`);
        this.inflection = $(inflectionHtml)
            .text()
            .replace(/(-declension)|(declension)|(adjective)|(participle)|(numeral)|[.\d\[\]]/gi, "")
            .replace(/\s+/g, " ")
            .toLowerCase()
            .trim();
        if (!this.inflection.length)
            this.inflection = "uninflected";
    }
}
exports.default = Adjective;
//# sourceMappingURL=Adjective.js.map