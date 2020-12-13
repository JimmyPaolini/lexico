"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester_1 = __importDefault(require("../../Ingester"));
class Noun extends Ingester_1.default {
    firstPrincipalPartName() {
        return "nominative";
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
            .replace(/(-declension)|(declension)|(noun)|[.\d\[\]]/gi, "")
            .replace(/\s+/g, " ")
            .toLowerCase()
            .trim();
        if (!$(elt).children("span.gender").length)
            throw new Error("no gender");
        let gender = $(elt).children("span.gender").text();
        gender = gender
            .replace(/^m|m$/, "masculine")
            .replace(/^f|f$/, "feminine")
            .replace(/^n|n$/, "neuter")
            .replace("sg", "singular")
            .replace("pl", "plural");
        this.inflection += ", " + gender;
        if (!this.inflection.length)
            this.inflection = "uninflected";
    }
}
exports.default = Noun;
//# sourceMappingURL=Noun.js.map