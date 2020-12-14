"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester_1 = __importDefault(require("../../Ingester"));
class Adverb extends Ingester_1.default {
    constructor() {
        super(...arguments);
        this.firstPrincipalPartName = "positive";
    }
    ingestInflection() {
        let inflection = this.principalParts.length > 1 ? "descriptive" : "conjunctional";
        return inflection;
    }
    ingestForms() {
        let disorganizedForms = [];
        for (const pp of this.principalParts.slice(1)) {
            for (const word of pp.text.split(" or ")) {
                disorganizedForms.push({
                    word: [word],
                    identifiers: [pp.name],
                });
            }
        }
        return null;
    }
}
exports.default = Adverb;
//# sourceMappingURL=Adverb.js.map