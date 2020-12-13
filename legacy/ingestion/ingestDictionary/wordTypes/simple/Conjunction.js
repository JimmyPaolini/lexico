const Etymology = require("../../Etymology")

class Conjunction extends Etymology {
    firstPrincipalPartName() { return this.partOfSpeech; }
    ingestInflection($, elt) { this.inflection = 'uninflected' }
    ingestForms($, elt) {}
}

module.exports = Conjunction