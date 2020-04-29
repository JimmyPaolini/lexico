const Etymology = require('../Etymology')

class Adverb extends Etymology {
    firstPrincipalPartName() { return 'positive'; }

    ingestInflection($, elt) {
        if (this.principalParts.length > 1) this.inflection = 'descriptive'
        else this.inflection = 'conjunctional'
    }

    ingestForms($, elt) {
        this.disorganizedForms = []
        for (const pp of this.principalParts.slice(1))
            for (const word of pp.split(': ')[1].split(' or '))
                this.disorganizedForms.push({
                    word: [word], identifiers: [pp.split(': ')[0]]
                })
    }

}

module.exports = Adverb