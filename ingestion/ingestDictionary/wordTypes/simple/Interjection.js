const Etymology = require("../../Etymology")

class Interjection extends Etymology {
    partOfSpeech = 'interjection'
    firstPrincipalPartName = 'interjection'
    ingestInflection($, elt) {}
    ingestForms($, elt) {}
}

module.exports = Interjection