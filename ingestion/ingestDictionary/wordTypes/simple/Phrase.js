const Etymology = require("../../Etymology")

class Phrase extends Etymology {
    partOfSpeech = 'phrase'
    firstPrincipalPartName = 'phrase'
    ingestInflection($, elt) {}
    ingestForms($, elt) {}
}

module.exports = Phrase