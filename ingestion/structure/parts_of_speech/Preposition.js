const Etymology = require("../Etymology")

class Preposition extends Etymology {
    constructor() {
        super()
        this.partOfSpeech = 'preposition'
    }

    targetCase = ``
    ingest($, elt) {
        super.ingest($, elt)
        try { this.targetCase = $(elt).text().split('(+ ')[1].split(')')[0].split(', ') }
        catch (e) { console.error(`Trouble ingesting targetCase - ${e}`)}
    }
}

module.exports = Preposition