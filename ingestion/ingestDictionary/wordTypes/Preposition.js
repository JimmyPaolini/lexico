const Etymology = require('../Etymology')

class Preposition extends Etymology {
    firstPrincipalPartName() { return this.partOfSpeech; }

    ingestInflection($, elt) {
        this.inflection = $(elt).text().split('(+ ')[1].split(')')[0]
        if (!this.inflection.length) this.inflection = 'accusative'
    }

    ingestForms($, elt) {}
}

module.exports = Preposition