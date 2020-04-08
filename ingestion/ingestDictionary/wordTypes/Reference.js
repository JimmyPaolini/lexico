const Etymology = require('../Etymology')
const getPronunciations = require('../../pronunciation')

class Reference extends Etymology {
    constructor(word, rootEtymology, forms) {
        super()
        this.inflection = 'referential'
        this.partOfSpeech = rootEtymology.partOfSpeech
        this.translations = rootEtymology.translations
        this.principalParts = [`macronized: ${word}`, ...rootEtymology.principalParts]
        this.forms = [rootEtymology.partOfSpeech === 'verb' ? forms : forms.reverse()]
        try { this.ingestPronunciation(0,0) } catch (e) { /*this.errors.push(`Pronunciation ${e}`);*/ }
    }
}

module.exports = Reference