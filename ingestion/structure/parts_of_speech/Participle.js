const Adjective = require("./Adjective")

class Participle extends Adjective {
    constructor() {
        super()
        this.partOfSpeech = 'participle'
    }

}

module.exports = Participle