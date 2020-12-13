"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester_1 = __importDefault(require("../Ingester"));
class Adverb extends Ingester_1.default {
    firstPrincipalPartName() {
        return "positive";
    }
    ingestInflection($, elt) {
        if (this.principalParts.length > 1)
            this.inflection = "descriptive";
        else
            this.inflection = "conjunctional";
    }
    ingestForms($, elt) {
        this.disorganizedForms = [];
        for (const pp of this.principalParts.slice(1))
            for (const word of pp.split(": ")[1].split(" or "))
                this.disorganizedForms.push({
                    word: [word],
                    identifiers: [pp.split(": ")[0]],
                });
    }
}
exports.default = Adverb;
//# sourceMappingURL=Adverb.js.map