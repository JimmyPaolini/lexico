"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPronunciation = exports.PronunciationParts = exports.Pronunciation = void 0;
class Pronunciation {
    constructor() {
        return exports.defaultPronunciation;
    }
}
exports.Pronunciation = Pronunciation;
class PronunciationParts {
}
exports.PronunciationParts = PronunciationParts;
exports.defaultPronunciation = {
    classical: {
        phonemes: "",
        phonemic: "",
        phonetic: "",
    },
    ecclesiastical: {
        phonemes: "",
        phonemic: "",
        phonetic: "",
    },
    vulgar: {
        phonemes: "",
        phonemic: "",
        phonetic: "",
    },
};
//# sourceMappingURL=Pronunciation.js.map