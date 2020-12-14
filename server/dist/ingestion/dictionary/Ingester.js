"use strict";
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
    constructor($, elt) {
        this.firstPrincipalPartName = "";
        this.$ = $;
        this.elt = elt;
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
        return translations_1.default(this.$, this.elt);
    }
    ingestForms() {
        return forms_1.default(this.$, this.elt);
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