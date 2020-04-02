const Etymology = require("../../Etymology")

class Conjunction extends Etymology {
    partOfSpeech = 'conjunction'
    firstPrincipalPartName = 'conjunction'
    ingestInflection($, elt) {}
    ingestForms($, elt) {}
}

module.exports = Conjunction