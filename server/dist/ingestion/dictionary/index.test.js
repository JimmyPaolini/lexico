"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const ingestHtml_1 = __importDefault(require("./ingestHtml"));
const word = "aeternus";
ingestHtml_1.default(require(path_1.default.join(process.cwd(), `server/data/html/${word}.json`))).then(() => console.log("done"));
//# sourceMappingURL=index.test.js.map