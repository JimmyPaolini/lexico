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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const tslog_1 = require("tslog");
const getFirstLetter_1 = require("../../utils/getFirstLetter");
const putItemHtml = (entry) => fs_1.default.writeFileSync(path_1.default.join(process.cwd(), `./data/wiktionary/${entry.category}/${cleanup(entry.word)}.json`), JSON.stringify(entry, null, 2));
const cleanup = (word) => word
    .split("")
    .map((c) => (c.match(/[A-Z]/g) ? c + "`" : c))
    .join("");
const log = new tslog_1.Logger();
const categories = {
    lemma: "Latin_lemmas",
    nonlemma: "Latin_non-lemma_forms",
    participle: "Latin_participle_forms",
    comparativeadverb: "Latin_comparative_adverbs",
};
ingestWiktionary(...process.argv.slice(2, 5));
function ingestWiktionary(category = "lemma", firstLetter = "a", lastLetter = "z") {
    return __awaiter(this, void 0, void 0, function* () {
        log.info(`${new Date().toLocaleString()} - START - category="${category}", ` +
            `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`);
        const host = `https://en.wiktionary.org`;
        let path = categories[category]
            ? `/w/index.php?title=Category:${categories[category]}&pagefrom=${firstLetter}`
            : category.replace(host, "");
        firstLetter = firstLetter.toLowerCase();
        lastLetter = lastLetter.toLowerCase();
        try {
            while (path) {
                log.info(`${new Date().toLocaleString()} - ${host + path}`);
                let $ = cheerio_1.default.load(yield request_promise_native_1.default.get(host + path, { forever: true }));
                for (const a of $("#mw-pages div.mw-category > div.mw-category-group > ul > li a").get()) {
                    const word = $(a).text();
                    const href = $(a).attr("href") || "";
                    if (word.match(/(Reconstruction:)|(Appendix:)/gi))
                        continue;
                    if (getFirstLetter_1.getFirstLetter(word) < firstLetter ||
                        getFirstLetter_1.getFirstLetter(word) > lastLetter) {
                        log.info(`${new Date().toLocaleString()} - FINISH - category="${category}", ` +
                            `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`);
                        return;
                    }
                    yield ingestWord(word, href, category);
                }
                path = $('a:contains("next page")').eq(0).attr("href") || "";
            }
        }
        catch (e) {
            log.error(`Error on url "https://en.wiktionary.org${path}" - ${e.toString()}`);
            return yield ingestWiktionary(path, firstLetter, lastLetter);
        }
    });
}
function ingestWord(word, path, category) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!path.match(/.*#Latin/))
            path += "#Latin";
        const entry = {
            word,
            category,
            href: `https://en.wiktionary.org${path}`,
        };
        if (entry.href.includes(`/w/index.php`))
            return log.info(`Error "${entry.word}" - no wiktionary page`);
        const $ = cheerio_1.default.load(yield request_promise_native_1.default.get(entry.href, { timeout: 10000, forever: true }));
        const section = $("span#Latin").parent().nextUntil("hr");
        if (section.length < 1)
            return log.info(`Error "${entry.word}" - no latin entry in wiktionary`);
        entry.html = `<div class="${entry.word}">${$.html(section)}</div>`;
        putItemHtml(entry);
        log.info(`Ingested "${entry.word}" HTML`);
    });
}
//# sourceMappingURL=index.js.map