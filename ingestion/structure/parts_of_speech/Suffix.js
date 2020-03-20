const Adjective = require("./Adjective")

class Suffix extends Adjective {
    constructor() {
        super()
        this.partOfSpeech = 'suffix'
    }

}

module.exports = Suffix