const Etymology = require("../../Etymology")

class Interjection extends Etymology {
    firstPrincipalPartName() { return this.partOfSpeech; }
    ingestInflection($, elt) { this.inflection = 'uninflected' }
    ingestForms($, elt) {}
}

module.exports = Interjection