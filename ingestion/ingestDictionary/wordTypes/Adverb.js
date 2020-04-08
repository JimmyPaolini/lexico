const Etymology = require('../Etymology')

class Adverb extends Etymology {
    partOfSpeech = 'adverb'
    firstPrincipalPartName = 'positive'

    ingestInflection($, elt) {
        if (this.principalParts.length > 1) this.inflection = 'descriptive'
        else this.inflection = 'conjunctional'
    }

    ingestForms($, elt) {
        this.disorganizedForms = []
        for (const pp of this.principalParts)
            for (const word of pp.split(': ')[1].split(' or '))
                this.disorganizedForms.push({
                    word: [word], identifiers: [pp.split(': ')[0]]
                })
    }

}

module.exports = Adverb