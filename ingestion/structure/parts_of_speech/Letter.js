const Etymology = require("../Etymology")

class Letter extends Etymology {
    constructor() {
        super()
        this.partOfSpeech = 'conjunction'
    }

    ingest($, elt) { super.ingest($, elt) }

}

module.exports = Letter