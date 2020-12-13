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
const ingestHtml_1 = __importDefault(require("./ingestHtml"));
main(process.argv[2], process.argv[3]);
function main(firstLetter = "a", lastLetter = "z") {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`${new Date().toLocaleString()} - READING HTML FILES`);
        const files = getHtmlFiles(firstLetter, lastLetter);
        console.log(`${new Date().toLocaleString()} - STARTING INGESTION`);
        for (let fileName of files) {
            const html = require(path_1.default.join(process.cwd(), `../data/html/${fileName}`));
            ingestHtml_1.default(html);
        }
        console.log(`${new Date().toLocaleString()} - FINISHED INGESTION`);
    });
}
exports.default = main;
function getHtmlFiles(firstLetter = "a", lastLetter = "z") {
    let files = fs_1.default.readdirSync(path_1.default.join(process.cwd(), `./data/html`));
    files = files.filter((fileName) => getFirstLetter(fileName) >= firstLetter &&
        getFirstLetter(fileName) <= lastLetter);
    files = files.filter((fileName) => !fileName.slice(0, -5).match(/\s|\.|-/g));
    files.sort((a, b) => getFirstLetter(a).localeCompare(getFirstLetter(b)));
    return files;
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
//# sourceMappingURL=index.js.map