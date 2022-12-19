import AdjectiveInflection, {
  AdjectiveDeclension,
  adjectiveDelensionRegex,
} from '../../../../../server/src/entity/dictionary/word/inflection/AdjectiveInflection'
import Uninflected from '../../../../../server/src/entity/dictionary/word/inflection/Uninflected'
import Adjective from './Adjective'

export default class Pronoun extends Adjective {
  async ingestInflection() {
    const $ = this.$
    const elt = this.elt
    if (!$(elt).text().includes(';')) return new Uninflected()
    let declension = $(elt)
      .text()
      .split('; ')[1]
      .replace('pronoun', '')
      .replace('-', '')
      .replace('declension', '')
      .replace(/\s+/g, ' ')
      .trim()

    if (!declension.length) return new Uninflected()
    declension = declension.match(adjectiveDelensionRegex)?.[0] || ''
    return new AdjectiveInflection(declension as AdjectiveDeclension)
  }
}
