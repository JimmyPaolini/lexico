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
const Word_1 = __importDefault(require("../../entity/Word"));
const Ingester_1 = __importDefault(require("./Ingester"));
const Noun_1 = __importDefault(require("./ingesters/nouns/Noun"));
function ingestHtml(word) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("ingesting", word);
        const $ = cheerio_1.default.load(word.html);
        for (const elt of $("p:has(strong.Latn.headword)").get()) {
            ingestWord($, elt);
        }
    });
}
exports.default = ingestHtml;
function ingestWord($, elt) {
    const word = new Word_1.default();
    word.partOfSpeech = Ingester_1.default.getPartOfSpeech($, elt);
    const ingestersMap = {
        noun: Noun_1.default,
    };
    const ingester = new ingestersMap[word.partOfSpeech]($, elt);
    word.inflection = ingester.ingestInflection();
    word.principalParts = ingester.ingestPrincipalParts();
    word.translations = ingester.ingestTranslations();
    word.pronunciation = ingester.ingestPronunciation();
    word.etymology = ingester.ingestEtymology();
    console.log(JSON.stringify(word, null, 2));
}
//# sourceMappingURL=ingestHtml.js.map