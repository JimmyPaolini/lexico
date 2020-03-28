const Adjective = require("./Adjective")

class Prefix extends Adjective {
    partOfSpeech = 'prefix'
    ingestInflection($, elt) {}
    ingestForms($, elt) {}
}

module.exports = Prefix