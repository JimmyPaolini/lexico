const InflectedEtymology = require("../InflectedEtymology")

class Adjective extends InflectedEtymology {
    constructor() {
        super('masculine')
        this.partOfSpeech = 'adjective'
    }

    ingest($, elt) {
        super.ingest($, elt)
        try { super.ingestInflections($, elt) }
        catch (e) { this.errors.push(`Inflections ${e}`); delete this.inflections }
        try { this.ingestDeclension($, elt) }
        catch (e) { this.errors.push(`Declension ${e}`); delete this.declension }
        if (!this.errors) delete this.errors
    }

    declension = ``
    ingestDeclension($, elt) {
        this.declension = $(elt).text().split(';')[1].trim().split(' ')[0].split('-')[0]
    }
}

module.exports = Adjective