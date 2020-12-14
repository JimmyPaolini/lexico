"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester_1 = __importDefault(require("../../Ingester"));
class Preposition extends Ingester_1.default {
    constructor() {
        super(...arguments);
        this.firstPrincipalPartName = Ingester_1.default.getPartOfSpeech(this.$, this.elt);
    }
    ingestInflection() {
        let inflection = this.$(this.elt).text().split("(+ ")[1].split(")")[0];
        if (!inflection.length)
            return "accusative";
        return inflection;
    }
    ingestForms() {
        return null;
    }
}
exports.default = Preposition;
//# sourceMappingURL=Preposition.js.map