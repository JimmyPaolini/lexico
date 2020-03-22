const InflectedEtymology = require("../InflectedEtymology")

class Noun extends InflectedEtymology {
    constructor() {
        super('nominative')
        this.partOfSpeech = 'noun'
    }

    ingest($, elt) {
        super.ingest($, elt)
        try { super.ingestInflections($, elt) }
        catch (e) { this.errors.push(`Inflections ${e}`); delete this.inflections }
        try { this.ingestDeclension($, elt) }
        catch (e) { this.errors.push(`Declension ${e}`); delete this.declension }
        try { this.ingestGender($, elt) }
        catch (e) { this.errors.push(`Gender ${e}`); delete this.gender }
        if (!this.errors) delete this.errors
    }

    declension = ``
    ingestDeclension($, elt) {
        if ($(elt).text().includes(';')) this.declension = $(elt).text().split('; ')[1].split(' ')[0]
        else this.declension = $(elt).text().split('(')[1].split(')')[0]
    }

    gender = ``
    ingestGender($, elt) {
        if (!$(elt).children('span.gender').length) throw new Error('no gender found')
        else this.gender = $(elt).children('span.gender').text()
    }
}

module.exports = Noun