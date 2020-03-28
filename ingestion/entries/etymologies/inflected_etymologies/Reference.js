const InflectedEtymology = require("./InflectedEtymology")

class Reference extends InflectedEtymology {
    constructor(rootWord, forms) {
        super()
        this.inflection = 'referential'
        this.partOfSpeech = rootWord.partOfSpeech
        this.translations = rootWord.translations
        this.principalParts = rootWord.principalParts
        this.forms = [rootWord.partOfSpeech === 'verb' ? forms : forms.reverse()]
        delete this.errors
    }
}

module.exports = Reference