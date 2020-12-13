const Ingester = require("../../Ingester")

export default class Interjection extends Ingester {
    firstPrincipalPartName() { return this.partOfSpeech; }
    ingestInflection($, elt) { this.inflection = 'uninflected' }
    ingestForms($, elt) {}
}

module.exports = Interjection