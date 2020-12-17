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
const typeorm_1 = require("typeorm");
const Word_1 = __importDefault(require("../../../../entity/Word"));
const Ingester_1 = __importDefault(require("../../Ingester"));
const forms_1 = require("../forms");
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
        return __awaiter(this, void 0, void 0, function* () {
            let disorganizedForms = [];
            for (const pp of this.principalParts.slice(1)) {
                for (const word of pp.text.split(" or ")) {
                    disorganizedForms.push({
                        word: [word],
                        identifiers: [pp.name],
                    });
                }
            }
            const Words = typeorm_1.getConnection().getRepository(Word_1.default);
            for (const inflection of JSON.parse(JSON.stringify(disorganizedForms))) {
                for (const wordString of inflection.word) {
                    yield forms_1.insertForm(wordString, this.word, Words);
                }
            }
            return null;
        });
    }
}
exports.default = Adverb;
//# sourceMappingURL=Adverb.js.map