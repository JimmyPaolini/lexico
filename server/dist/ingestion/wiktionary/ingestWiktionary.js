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
const chalk_1 = __importDefault(require("chalk"));
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const now = () => new Date().toLocaleString();
const cleanup = (word) => word
    .split("")
    .map((c) => (c.match(/[A-Z]/g) ? c + "`" : c))
    .join("");
const categories = {
    lemma: "Latin_lemmas",
    nonlemma: "Latin_non-lemma_forms",
    participle: "Latin_participle_forms",
    comparativeadverb: "Latin_comparative_adverbs",
};
ingestWiktionary(...process.argv.slice(2, 5));
function ingestWiktionary(category = "lemma", firstLetter = "a", lastLetter = "z") {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.red(`${now()} - START - category="${category}", ` +
            `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`));
        const host = `https://en.wiktionary.org`;
        let path = categories[category]
            ? `/w/index.php?title=Category:${categories[category]}&pagefrom=${firstLetter}`
            : category.replace(host, "");
        firstLetter = firstLetter.toLowerCase();
        lastLetter = lastLetter.toLowerCase();
        try {
            while (path) {
                console.log(chalk_1.default.yellow(`${now()} - ${host + path}`));
                let $ = cheerio_1.default.load(yield request_promise_native_1.default.get(host + path, { forever: true }));
                for (const a of $("#mw-pages div.mw-category > div.mw-category-group > ul > li a").get()) {
                    const word = $(a).text();
                    const href = $(a).attr("href") || "";
                    if (word.match(/(Reconstruction:)|(Appendix:)/gi))
                        continue;
                    if (getFirstLetter(word) < firstLetter ||
                        getFirstLetter(word) > lastLetter) {
                        console.log(chalk_1.default.red(`${now()} - FINISH - category="${category}", ` +
                            `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`));
                    }
                    fs_1.default.writeFileSync(`./data/wiktionary/${category}/${cleanup(word)}.json`, fs_1.default.readFileSync(`./data/wiktionary/${cleanup(word)}.json`));
                }
                path = $('a:contains("next page")').eq(0).attr("href") || "";
            }
        }
        catch (e) {
            console.log(chalk_1.default.red(`Error on url "https://en.wiktionary.org${path}" - ${e.toString()}`));
        }
    });
}
function getFirstLetter(word) {
    const [l1, l2] = [...word.toLowerCase()];
    if (!l1.match(/[a-z-]/) && !l1.match(/[a-z-]/))
        return "*";
    if (l1 === "-")
        return l2;
    else
        return l1;
}
//# sourceMappingURL=ingestWiktionary.js.map