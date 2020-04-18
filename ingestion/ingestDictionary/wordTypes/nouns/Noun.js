const Etymology = require('../../Etymology')

class Noun extends Etymology {
    partOfSpeech = 'noun'
    firstPrincipalPartName = 'nominative'

    ingestInflection($, elt) {
        const inflectionHtml = $(elt).nextUntil('h3',':header:contains("Declension")').first().next()
        if (!$(inflectionHtml).length) throw new Error(`no inflection`)
        this.inflection = $(inflectionHtml).text()
            .replace(/(-declension)|(declension)|(noun)|[.\d\[\]]/gi,'')
            .replace(/\s+/g,' ').toLowerCase().trim()

        if (!$(elt).children('span.gender').length) throw new Error('no gender')
        let gender = $(elt).children('span.gender').text()
        gender = gender.replace(/^m|m$/, 'masculine').replace(/^f|f$/, 'feminine').replace(/^n|n$/, 'neuter')
            .replace('sg', 'singular').replace('pl', 'plural')
        this.inflection += ', ' + gender

        if (!this.inflection.length) this.inflection = 'uninflected'
    }
}

module.exports = Noun