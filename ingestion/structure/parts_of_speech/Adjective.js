const InflectedEtymology = require("../InflectedEtymology")

class Adjective extends InflectedEtymology {
    constructor() {
        super('masculine')
        this.partOfSpeech = 'adjective'
    }

    ingest($, elt) {
        super.ingest($, elt)
        try { super.ingestInflections($, elt) }
        catch (e) { console.error(`Trouble ingesting inflections - ${e}`); delete this.inflections }
        try { this.ingestDeclension($, elt) }
        catch (e) { console.error(`Trouble ingesting declension - ${e}`); delete this.declension }
    }

    declension = ``
    ingestDeclension($, elt) {
        this.declension = $(elt).text().split(';')[1].trim().split(' ')[0].split('-')[0]
    }
}

module.exports = Adjective