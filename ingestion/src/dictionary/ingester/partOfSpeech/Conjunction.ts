import Uninflected from '../../../../../entity/dictionary/word/inflection/Uninflected'
import Ingester from '../../Ingester'

export default class Conjunction extends Ingester {
  firstPrincipalPartName = Ingester.getPartOfSpeech(this.$, this.elt)

  async ingestInflection() {
    return new Uninflected()
  }

  async ingestForms() {
    return null
  }
}
