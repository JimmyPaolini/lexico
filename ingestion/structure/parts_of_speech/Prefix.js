const Adjective = require("./Adjective")

class Prefix extends Adjective {
    constructor() {
        super()
        this.partOfSpeech = 'prefix'
    }

}

module.exports = Prefix