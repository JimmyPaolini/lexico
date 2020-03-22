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
        catch (e) { this.errors.push(`TargetCase ${e}`); delete this.targetCase }
        if (!this.errors) delete this.errors
    }
}

module.exports = Preposition