"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester_1 = __importDefault(require("../Ingester"));
class Preposition extends Ingester_1.default {
    firstPrincipalPartName() {
        return this.partOfSpeech;
    }
    ingestInflection($, elt) {
        this.inflection = $(elt).text().split("(+ ")[1].split(")")[0];
        if (!this.inflection.length)
            this.inflection = "accusative";
    }
    ingestForms($, elt) { }
}
exports.default = Preposition;
//# sourceMappingURL=Preposition.js.map