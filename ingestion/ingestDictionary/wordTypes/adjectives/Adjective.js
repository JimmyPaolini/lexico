const Etymology = require('../../Etymology')

class Adjective extends Etymology {
    partOfSpeech = 'adjective'
    firstPrincipalPartName = 'masculine'

    ingestInflection($, elt) {
        if (!$(elt).text().includes(';')) throw new Error(`no inflection`)
        this.inflection = $(elt).text().split('; ')[1]
        this.inflection = this.inflection.replace('declension', '')
            .replace('-', '')
            .replace('adjective', '')
            .replace('participle', '')
            .replace(/\s+/g,' ').trim()
    }
}

module.exports = Adjective