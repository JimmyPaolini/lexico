const InflectedEtymology = require("../InflectedEtymology")

class Pronoun extends InflectedEtymology {
    constructor() {
        super('masculine')
        this.partOfSpeech = 'pronoun'
    }

    ingest($, elt) {
        super.ingest($, elt)
        try { super.ingestInflections($, elt) }
        catch (e) { this.errors.push(`Inflections ${e}`); delete this.inflections }
        if (!this.errors) delete this.errors
    }
}

module.exports = Pronoun