import { Forms } from '../../../../../server/entity/dictionary/word/Forms'
import { Inflection } from '../../../../../server/entity/dictionary/word/Inflection'
import PrepositionInflection, {
  PrepositionCase,
  prepositionCaseRegex,
} from '../../../../../server/entity/dictionary/word/inflection/PrepositionInflection'
import Ingester from '../../Ingester'

export default class Preposition extends Ingester {
  firstPrincipalPartName = Ingester.getPartOfSpeech(this.$, this.elt)

  async ingestInflection(): Promise<Inflection> {
    const other = this.$(this.elt).text().split('(+ ')[1]?.split(')')[0]
    if (!other || !other.length) return new PrepositionInflection('accusative')
    const prepositionCase = other.match(prepositionCaseRegex)?.[0] || ''
    return new PrepositionInflection(prepositionCase as PrepositionCase, other)
  }

  async ingestForms(): Promise<Forms | null> {
    return null
  }
}
