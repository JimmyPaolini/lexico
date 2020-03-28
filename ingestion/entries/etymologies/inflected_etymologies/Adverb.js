const InflectedEtymology = require("./InflectedEtymology")

class Adverb extends InflectedEtymology {
    partOfSpeech = 'adverb'
    firstPrincipalPartName = 'positive'
    ingestInflection($, elt) {}
    ingestForms($, elt) {}
}

module.exports = Adverb