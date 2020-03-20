const InflectedEtymology = require("../InflectedEtymology")

class Noun extends InflectedEtymology {
    constructor() {
        super('nominative')
        this.partOfSpeech = 'noun'
    }

    ingest($, elt) {
        super.ingest($, elt)
        try { super.ingestInflections($, elt) }
        catch (e) { console.error(`Trouble ingesting inflections - ${e}`); delete this.inflections }
        try { this.ingestDeclension($, elt) }
        catch (e) { console.error(`Trouble ingesting declension - ${e}`); delete this.declension }
        try { this.ingestGender($, elt) }
        catch (e) { console.error(`Trouble ingesting gender - ${e}`); delete this.gender }
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