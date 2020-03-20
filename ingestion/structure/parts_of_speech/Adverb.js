const InflectedEtymology = require("../InflectedEtymology")

class Adverb extends InflectedEtymology {
    constructor() {
        super('positive')
        this.partOfSpeech = 'adverb'
    }
}

module.exports = Adverb