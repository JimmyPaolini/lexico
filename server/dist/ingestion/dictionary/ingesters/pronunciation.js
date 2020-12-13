"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pronunciation_1 = require("../../../entity/Pronunciation");
const classical_1 = __importDefault(require("../pronunciation/classical"));
const pronunciation_1 = require("../pronunciation/pronunciation");
function parsePronunciation(ingester, $, elt, macronizedWord) {
    if (!macronizedWord) {
        ingester.ingestPrincipalParts();
        return ingester.ingestPronunciation();
    }
    let pronunciation = new Pronunciation_1.Pronunciation();
    pronunciation.classical.phonemes = classical_1.default(macronizedWord);
    pronunciation.ecclesiastical.phonemes = pronunciation_1.getEcclesiasticalPronunciations(macronizedWord)[0];
    const pronunciationHeader = $(elt)
        .prevAll(':header:contains("Pronunciation")')
        .first();
    if ($(pronunciationHeader).length <= 0)
        return pronunciation;
    for (const pr of $(pronunciationHeader).next("ul").children().get()) {
        if ($(pr)
            .text()
            .match(/^audio/i))
            continue;
        const pronunciations = $(pr).text().split("IPA(key):")[1].split(", ");
        if ($(pr).find("a").text().includes("Classical")) {
            pronunciation.classical = Object.assign(Object.assign({}, pronunciation.classical), pronunciation_1.parsePhonics(pronunciations));
        }
        else if ($(pr).find("a").text().includes("Ecclesiastical")) {
            pronunciation.ecclesiastical = Object.assign(Object.assign({}, pronunciation.ecclesiastical), pronunciation_1.parsePhonics(pronunciations));
        }
        else if ($(pr).find("a").text().includes("Vulgar")) {
            pronunciation.vulgar = Object.assign(Object.assign({}, pronunciation.vulgar), pronunciation_1.parsePhonics(pronunciations));
        }
    }
    return pronunciation;
}
exports.default = parsePronunciation;
//# sourceMappingURL=pronunciation.js.map