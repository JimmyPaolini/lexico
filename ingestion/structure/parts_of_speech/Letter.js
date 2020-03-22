const Etymology = require("../Etymology")

class Letter extends Etymology {
    constructor() {
        super()
        this.partOfSpeech = 'letter'
    }

    ingest($, elt) {
        super.ingest($, elt)
        if (!this.errors) delete this.errors
    }
}

module.exports = Letter