const Etymology = require("../../Etymology")

class Phrase extends Etymology {
    firstPrincipalPartName() { return this.partOfSpeech; }
    ingestInflection($, elt) { this.inflection = 'uninflected' }
    ingestForms($, elt) {}
}

module.exports = Phrase