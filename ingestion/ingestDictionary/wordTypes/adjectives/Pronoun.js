const Adjective = require("./Adjective")

class Pronoun extends Adjective {
    partOfSpeech = 'pronoun'

    ingestInflection($, elt) {
        if (!$(elt).text().includes(';')) throw new Error(`no inflection`)
        this.inflection = $(elt).text().split('; ')[1]
        this.inflection = this.inflection.replace('pronoun', '')
            .replace('-', '')
            .replace('declension', '')
            .replace(/\s+/g,' ').trim()
    }
}

module.exports = Pronoun