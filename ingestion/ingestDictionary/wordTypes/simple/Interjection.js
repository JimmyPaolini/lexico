const Etymology = require("../../Etymology")

class Interjection extends Etymology {
    partOfSpeech = 'interjection'
    firstPrincipalPartName = 'interjection'
    ingestInflection($, elt) { this.inflection = 'uninflected' }
    ingestForms($, elt) {}
}

module.exports = Interjection