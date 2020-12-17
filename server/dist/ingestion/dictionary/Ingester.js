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
const etymology_1 = __importDefault(require("./ingester/etymology"));
const form_1 = __importDefault(require("./ingester/form"));
const principalPart_1 = __importDefault(require("./ingester/principalPart"));
const pronunciation_1 = __importDefault(require("./ingester/pronunciation"));
const translation_1 = __importDefault(require("./ingester/translation"));
class Ingester {
    constructor($, elt, word) {
        this.firstPrincipalPartName = "";
        this.$ = $;
        this.elt = elt;
        this.word = word;
    }
    static getPartOfSpeech($, elt) {
        return $(elt)
            .prevAll(":header")
            .first()
            .text()
            .toLowerCase()
            .replace(/(\[edit])|\d+/g, "")
            .trim()
            .replace("proper noun", "properNoun");
    }
    ingestPrincipalParts() {
        this.principalParts = principalPart_1.default(this, this.$, this.elt, this.firstPrincipalPartName);
        return this.principalParts;
    }
    ingestTranslations() {
        return translation_1.default(this.$, this.elt, this.word);
    }
    ingestForms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield form_1.default(this.$, this.elt, this.word);
        });
    }
    ingestPronunciation() {
        return pronunciation_1.default(this, this.$, this.elt, this.macronizedWord);
    }
    ingestEtymology() {
        return etymology_1.default(this.$, this.elt);
    }
    ingestSynonyms() {
        return [];
    }
    ingestAntonyms() {
        return [];
    }
}
exports.default = Ingester;
//# sourceMappingURL=Ingester.js.map