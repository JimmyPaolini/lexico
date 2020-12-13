"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester_1 = __importDefault(require("../../Ingester"));
class Phrase extends Ingester_1.default {
    firstPrincipalPartName() {
        return this.partOfSpeech;
    }
    ingestInflection($, elt) {
        this.inflection = "uninflected";
    }
    ingestForms($, elt) { }
}
exports.default = Phrase;
//# sourceMappingURL=Phrase.js.map