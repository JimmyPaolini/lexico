const Etymology = require("../../Etymology")

class Phrase extends Etymology {
    partOfSpeech = 'phrase'
    firstPrincipalPartName = 'phrase'
    ingestInflection($, elt) { this.inflection = 'uninflected' }
    ingestForms($, elt) {}
}

module.exports = Phrase