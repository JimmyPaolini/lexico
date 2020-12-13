"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester_1 = __importDefault(require("../Ingester"));
class Inflection extends Ingester_1.default {
    constructor(word, rootEtymology, forms) {
        super();
        this.inflection = "inflection";
        this.partOfSpeech = rootEtymology.partOfSpeech;
        this.translations = rootEtymology.translations;
        this.principalParts = [
            `macronized: ${word}`,
            ...rootEtymology.principalParts,
        ];
        this.forms = [
            rootEtymology.partOfSpeech === "verb" ? forms : forms.reverse(),
        ];
        try {
            this.ingestPronunciation(0, 0);
        }
        catch (e) {
        }
    }
}
exports.default = Inflection;
//# sourceMappingURL=Inflection.js.map