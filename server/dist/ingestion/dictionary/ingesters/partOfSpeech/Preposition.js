"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
}
exports.default = Preposition;
//# sourceMappingURL=Preposition.js.map