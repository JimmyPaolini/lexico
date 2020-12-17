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
const etymology_1 = __importDefault(require("./ingesters/etymology"));
const forms_1 = __importDefault(require("./ingesters/forms"));
const principalParts_1 = __importDefault(require("./ingesters/principalParts"));
const pronunciation_1 = __importDefault(require("./ingesters/pronunciation"));
const translations_1 = __importDefault(require("./ingesters/translations"));
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
            .trim();
    }
    ingestPrincipalParts() {
        this.principalParts = principalParts_1.default(this, this.$, this.elt, this.firstPrincipalPartName);
        return this.principalParts;
    }
    ingestTranslations() {
        return translations_1.default(this.$, this.elt, this.word);
    }
    ingestForms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield forms_1.default(this.$, this.elt, this.word);
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