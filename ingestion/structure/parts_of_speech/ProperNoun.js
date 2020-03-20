const Noun = require("./Noun")

class ProperNoun extends Noun {
    constructor() {
        super()
        this.partOfSpeech = 'proper noun'
    }
}

module.exports = ProperNoun