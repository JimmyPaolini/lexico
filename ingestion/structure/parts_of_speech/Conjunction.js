const Etymology = require("../Etymology")

class Conjunction extends Etymology {
    constructor() {
        super()
        this.partOfSpeech = 'conjunction'
    }

    ingest($, elt) {
        super.ingest($, elt)
        if (!this.errors) delete this.errors
    }
}

module.exports = Conjunction