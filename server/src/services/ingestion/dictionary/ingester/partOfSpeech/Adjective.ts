import { Inflection } from '../../../../../entity/dictionary/word/Inflection'
import AdjectiveInflection, {
  AdjectiveDeclension,
  AdjectiveDegree,
  adjectiveDegreeRegex,
  adjectiveDelensionRegex,
} from '../../../../../entity/dictionary/word/inflection/AdjectiveInflection'
import Uninflected from '../../../../../entity/dictionary/word/inflection/Uninflected'
import Ingester from '../../Ingester'

export default class Adjective extends Ingester {
  firstPrincipalPartName = 'masculine'

  async ingestInflection(): Promise<Inflection> {
    const $ = this.$
    const elt = this.elt
    const inflectionHtml = $(elt)
      .nextUntil('h3', ':header:contains("Declension")')
      .first()
      .next()
    if (!$(inflectionHtml).length) return new Uninflected()
    let declension = $(inflectionHtml)
      .text()
      .replace(
        /(-declension)|(declension)|(adjective)|(participle)|(numeral)|[.\d[\]]/gi,
        ''
      )
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .trim()

    if (!declension.length) return new Uninflected()
    const other = declension
    const degree = declension.match(adjectiveDegreeRegex)?.[0] || ''
    declension = declension.match(adjectiveDelensionRegex)?.[0] || ''
    return new AdjectiveInflection(
      declension as AdjectiveDeclension,
      degree as AdjectiveDegree,
      other
    )
  }
}
