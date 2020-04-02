const Etymology = require('../../Etymology')

class Noun extends Etymology {
    partOfSpeech = 'noun'
    firstPrincipalPartName = 'nominative'

    ingestInflection($, elt) {
        if (!/\(.*\)|;/g.test($(elt).text())) return new Error('no inflection')
        if ($(elt).text().includes(';')) this.inflection = $(elt).text().trim().split('; ')[1]
        else this.inflection = $(elt).text().trim().split('(')[1].split(')')[0]
        this.inflection = this.inflection.replace('declension', '')
            .replace(/\s+/g,' ').trim()

        if (!$(elt).children('span.gender').length) throw new Error('no gender')
        let gender = $(elt).children('span.gender').text()
        gender = gender.replace(/^m|m$/, 'masculine')
            .replace(/^f|f$/, 'feminine')
            .replace(/^n|n$/, 'neuter')
            .replace('sg', 'singular')
            .replace('pl', 'plural')
        this.inflection += ', ' + gender
    }
}

module.exports = Noun