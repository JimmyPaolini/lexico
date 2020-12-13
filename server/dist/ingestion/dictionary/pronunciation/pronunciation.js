"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePhonics = exports.getEcclesiasticalPronunciations = void 0;
const Pronunciation_1 = require("../../../entity/Pronunciation");
const ecclesiastical_1 = __importDefault(require("./ecclesiastical"));
function phonemesToPronunciations(phonemes) {
    const pronunciations = [];
    function buildPronunciations(prev, next) {
        if (next.length === 0)
            return pronunciations.push(prev.join(" "));
        const phoneme = next.shift();
        if (Array.isArray(phoneme))
            for (const option of phoneme)
                if (Array.isArray(option))
                    buildPronunciations([...prev, ...option], [...next]);
                else
                    buildPronunciations([...prev, option], [...next]);
        else
            buildPronunciations([...prev, phoneme], [
                ...next,
            ]);
    }
    buildPronunciations([], phonemes);
    return pronunciations;
}
function getEcclesiasticalPronunciations(word) {
    return phonemesToPronunciations(ecclesiastical_1.default(word));
}
exports.getEcclesiasticalPronunciations = getEcclesiasticalPronunciations;
function parsePhonics(pronunciations) {
    const parsed = new Pronunciation_1.PronunciationParts();
    for (const pronunciation of pronunciations) {
        if (/\/.*\//.test(pronunciation)) {
            parsed.phonemic = pronunciation.trim();
        }
        else if (/\[.*\]/.test(pronunciation)) {
            parsed.phonetic = pronunciation.trim();
        }
    }
    return parsed;
}
exports.parsePhonics = parsePhonics;
//# sourceMappingURL=pronunciation.js.map