"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ingester = require("../../Ingester");
class Interjection extends Ingester {
    firstPrincipalPartName() { return this.partOfSpeech; }
    ingestInflection($, elt) { this.inflection = 'uninflected'; }
    ingestForms($, elt) { }
}
exports.default = Interjection;
module.exports = Interjection;
//# sourceMappingURL=Interjection.js.map