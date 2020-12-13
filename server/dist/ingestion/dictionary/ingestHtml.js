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
const Adjective_1 = __importDefault(require("../../../../legacy/ingestion/ingestDictionary/wordTypes/adjectives/Adjective"));
const Numeral_1 = __importDefault(require("../../../../legacy/ingestion/ingestDictionary/wordTypes/adjectives/Numeral"));
const Pronoun_1 = __importDefault(require("../../../../legacy/ingestion/ingestDictionary/wordTypes/adjectives/Pronoun"));
const Adverb_1 = __importDefault(require("../../../../legacy/ingestion/ingestDictionary/wordTypes/Adverb"));
const Noun_1 = __importDefault(require("../../../../legacy/ingestion/ingestDictionary/wordTypes/nouns/Noun"));
const ProperNoun_1 = __importDefault(require("../../../../legacy/ingestion/ingestDictionary/wordTypes/nouns/ProperNoun"));
const Preposition_1 = __importDefault(require("../../../../legacy/ingestion/ingestDictionary/wordTypes/Preposition"));
const Conjunction_1 = __importDefault(require("../../../../legacy/ingestion/ingestDictionary/wordTypes/simple/Conjunction"));
const Verb_1 = __importDefault(require("../../../../legacy/ingestion/ingestDictionary/wordTypes/Verb"));
function ingestHtml(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const $ = cheerio_1.default.load(word.html);
        for (const elt of $("p:has(strong.Latn.headword)").get()) {
            ingestWord($, elt);
        }
    });
}
exports.default = ingestHtml;
function ingestWord($, elt) {
    const word = new Word_1.default();
    word.partOfSpeech = getPartOfSpeech($, elt);
    let Etymology = {
        "noun": Noun_1.default,
        "proper noun": ProperNoun_1.default,
        "verb": Verb_1.default,
        "adjective": Adjective_1.default,
        "participle": Partiple,
        "numeral": Numeral_1.default,
        "pronoun": Pronoun_1.default,
        "determiner": Pronoun_1.default,
        "adverb": Adverb_1.default,
        "preposition": Preposition_1.default,
        "conjunction": Conjunction_1.default,
    }[word.partOfSpeech];
    word.translations = Etymology.ingestTranslations($, elt);
}
function getPartOfSpeech($, elt) {
    return $(elt)
        .prevAll(":header")
        .first()
        .text()
        .toLowerCase()
        .replace(/(\[edit])|\d+/g, "")
        .trim();
}
//# sourceMappingURL=ingestHtml.js.map