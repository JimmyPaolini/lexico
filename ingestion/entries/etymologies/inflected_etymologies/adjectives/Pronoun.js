const Adjective = require("./Adjective")

class Pronoun extends Adjective {
    partOfSpeech = 'pronoun'
    firstPrincipalPartName = 'masculine'
    ingestInflection($, elt) {}
}

module.exports = Pronoun