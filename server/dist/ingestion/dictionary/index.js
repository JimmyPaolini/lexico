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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const tslog_1 = require("tslog");
const getFirstLetter_1 = require("../../utils/getFirstLetter");
const ingestWord_1 = __importDefault(require("./ingestWord"));
const log = new tslog_1.Logger();
function main(firstLetter = "a", lastLetter = "z") {
    return __awaiter(this, void 0, void 0, function* () {
        log.info(`READING HTML FILES`);
        const files = getHtmlFiles(firstLetter, lastLetter);
        log.info(`STARTING INGESTION`);
        for (let fileName of files) {
            log.info("fileName", fileName);
            yield ingestWord_1.default(fileName.replace(/\.json$/gi, ""));
        }
        log.info(`FINISHED INGESTION`);
    });
}
exports.default = main;
function getHtmlFiles(firstLetter, lastLetter) {
    return fs_1.default
        .readdirSync(path_1.default.join(process.cwd(), `./data/wiktionary/lemma`))
        .filter((fileName) => getFirstLetter_1.getFirstLetter(fileName) >= firstLetter &&
        getFirstLetter_1.getFirstLetter(fileName) <= lastLetter &&
        !fileName.slice(0, -5).match(/\s|\.|-/g))
        .sort((a, b) => getFirstLetter_1.getFirstLetter(a).localeCompare(getFirstLetter_1.getFirstLetter(b)));
}
//# sourceMappingURL=index.js.map