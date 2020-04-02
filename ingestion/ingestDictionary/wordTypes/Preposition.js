const Etymology = require('../Etymology')

class Preposition extends Etymology {
    partOfSpeech = 'preposition'
    firstPrincipalPartName = 'preposition'

    ingestInflection($, elt) {
        this.inflection = $(elt).text().split('(+ ')[1].split(')')[0]
    }

    ingestForms($, elt) {}
}

module.exports = Preposition