"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester_1 = __importDefault(require("../../Ingester"));
class Conjunction extends Ingester_1.default {
    constructor() {
        super(...arguments);
        this.firstPrincipalPartName = Ingester_1.default.getPartOfSpeech(this.$, this.elt);
    }
    ingestInflection() {
        return "uninflected";
    }
    ingestForms() {
        return null;
    }
}
exports.default = Conjunction;
//# sourceMappingURL=Conjunction.js.map