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
const tslog_1 = require("tslog");
const typeorm_1 = require("typeorm");
const Word_1 = __importDefault(require("../../entity/Word"));
const string_1 = require("../../utils/string");
const Ingester_1 = __importDefault(require("./Ingester"));
const Adjective_1 = __importDefault(require("./ingesters/partOfSpeech/Adjective"));
const Adverb_1 = __importDefault(require("./ingesters/partOfSpeech/Adverb"));
const Conjunction_1 = __importDefault(require("./ingesters/partOfSpeech/Conjunction"));
const Noun_1 = __importDefault(require("./ingesters/partOfSpeech/Noun"));
const Prefix_1 = __importDefault(require("./ingesters/partOfSpeech/Prefix"));
const Preposition_1 = __importDefault(require("./ingesters/partOfSpeech/Preposition"));
const Pronoun_1 = __importDefault(require("./ingesters/partOfSpeech/Pronoun"));
const Verb_1 = __importDefault(require("./ingesters/partOfSpeech/Verb"));
const log = new tslog_1.Logger();
function ingestHtml(data) {
    return __awaiter(this, void 0, void 0, function* () {
        log.info("ingesting", data.word);
        const Words = typeorm_1.getConnection().getRepository(Word_1.default);
        const $ = cheerio_1.default.load(data.html);
        try {
            for (const elt of $("p:has(strong.Latn.headword)").get()) {
                const word = yield ingestWord($, elt, data.word);
                yield Words.save(word);
            }
        }
        catch (e) {
            log.error(e);
        }
    });
}
exports.default = ingestHtml;
function ingestWord($, elt, wordString) {
    return __awaiter(this, void 0, void 0, function* () {
        const word = new Word_1.default();
        word.word = string_1.normalize(wordString);
        word.partOfSpeech = Ingester_1.default.getPartOfSpeech($, elt);
        const ingestersMap = {
            noun: Noun_1.default,
            properNoun: Noun_1.default,
            verb: Verb_1.default,
            adjective: Adjective_1.default,
            participle: Adjective_1.default,
            numeral: Adjective_1.default,
            suffix: Adjective_1.default,
            prefix: Prefix_1.default,
            pronoun: Pronoun_1.default,
            determiner: Pronoun_1.default,
            adverb: Adverb_1.default,
            preposition: Preposition_1.default,
            conjunction: Conjunction_1.default,
            interjection: Conjunction_1.default,
            phrase: Conjunction_1.default,
            proverb: Conjunction_1.default,
            idiom: Conjunction_1.default,
        };
        const ingester = new ingestersMap[word.partOfSpeech]($, elt, word);
        word.inflection = ingester.ingestInflection();
        word.principalParts = ingester.ingestPrincipalParts();
        word.translations = ingester.ingestTranslations();
        word.forms = yield ingester.ingestForms();
        word.pronunciation = ingester.ingestPronunciation();
        word.etymology = ingester.ingestEtymology();
        word.roots = [word];
        return word;
    });
}
//# sourceMappingURL=ingestHtml.js.map