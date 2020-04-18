const Etymology = require("../../Etymology")

class Conjunction extends Etymology {
    partOfSpeech = 'conjunction'
    firstPrincipalPartName = 'conjunction'
    ingestInflection($, elt) { this.inflection = 'uninflected' }
    ingestForms($, elt) {}
}

module.exports = Conjunction