const Etymology = require('../Etymology')
const getPronunciations = require('../../pronunciation')

class Reference extends Etymology {
    constructor(word, rootEtymology, forms) {
        super()
        this.inflection = 'referential'
        this.partOfSpeech = rootEtymology.partOfSpeech
        this.translations = rootEtymology.translations
        this.principalParts = rootEtymology.principalParts
        this.forms = [rootEtymology.partOfSpeech === 'verb' ? forms : forms.reverse()]
        this.pronunciation = {
            classical: { phonemes: getPronunciations(word, 'classical') },
            ecclesiastical: { phonemes: getPronunciations(word, 'ecclesiastical') },
            vulgar: { phonemes: getPronunciations(word, 'vulgar') }
        }
    }
}

module.exports = Reference