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
const cheerio_1 = __importDefault(require("cheerio"));
const Word_1 = __importDefault(require("src/entity/Word"));
function ingestWords(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const $ = cheerio_1.default.load(word.html);
        for (const elt of $("p:has(strong.Latn.headword)").get()) {
            ingestWord($, elt);
        }
    });
}
exports.default = ingestWords;
function ingestWord($, elt) {
    const word = new Word_1.default();
    let etymology;
    const partOfSpeech = $(elt)
        .prevAll(":header")
        .first()
        .text()
        .toLowerCase()
        .replace(/(\[edit])|\d+/g, "")
        .trim();
    if (partOfSpeech === "noun")
        etymology = new Noun($, elt);
    else if (partOfSpeech === "proper noun")
        etymology = new ProperNoun($, elt);
    else if (partOfSpeech === "verb")
        etymology = new Verb($, elt);
    else if (partOfSpeech === "adjective")
        etymology = new Adjective($, elt);
    else if (partOfSpeech === "participle")
        etymology = new Participle($, elt);
    else if (partOfSpeech === "numeral")
        etymology = new Numeral($, elt);
    else if (["pronoun", "determiner"].includes(partOfSpeech))
        etymology = new Pronoun($, elt);
    else if (["adverb", "particle"].includes(partOfSpeech))
        etymology = new Adverb($, elt);
    else if (partOfSpeech === "preposition")
        etymology = new Preposition($, elt);
    else if (partOfSpeech === "conjunction")
        etymology = new Conjunction($, elt);
    else
        return;
    if (etymology.inflection === "skip")
        return;
    this.etymologies.push(etymology);
}
//# sourceMappingURL=ingestHtml%20copy.js.map