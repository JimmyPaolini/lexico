const InflectedEtymology = require("./InflectedEtymology")

class Preposition extends InflectedEtymology {
    partOfSpeech = 'preposition'

    ingestInflection($, elt) {
        this.inflection = $(elt).text().split('(+ ')[1].split(')')[0]
    }

    ingestPrincipalParts($, elt) {}
    ingestForms($, elt) {}
}

module.exports = Preposition