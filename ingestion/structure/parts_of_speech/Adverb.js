const InflectedEtymology = require("../InflectedEtymology")

class Adverb extends InflectedEtymology {
    constructor() {
        super('positive')
        this.partOfSpeech = 'adverb'
    }

    ingest($, elt) {
        super.ingest($, elt)
        if (!this.errors) delete this.errors
    }
}

module.exports = Adverb