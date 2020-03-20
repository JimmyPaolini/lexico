const InflectedEtymology = require("../InflectedEtymology")

class Pronoun extends InflectedEtymology {
    constructor() {
        super('masculine')
        this.partOfSpeech = 'pronoun'
    }

    ingest($, elt) {
        super.ingest($, elt)
        try { super.ingestInflections($, elt) }
        catch (e) { console.error(`Trouble ingesting inflections - ${e}`)}
    }
}

module.exports = Pronoun