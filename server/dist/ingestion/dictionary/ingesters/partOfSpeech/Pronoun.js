"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Adjective_1 = __importDefault(require("./Adjective"));
class Pronoun extends Adjective_1.default {
    ingestInflection() {
        const $ = this.$;
        const elt = this.elt;
        if (!$(elt).text().includes(";"))
            throw new Error(`no inflection`);
        let inflection = $(elt)
            .text()
            .split("; ")[1]
            .replace("pronoun", "")
            .replace("-", "")
            .replace("declension", "")
            .replace(/\s+/g, " ")
            .trim();
        return inflection;
    }
}
exports.default = Pronoun;
//# sourceMappingURL=Pronoun.js.map