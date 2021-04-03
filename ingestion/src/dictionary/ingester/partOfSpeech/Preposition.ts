import PrepositionInflection, {
  PrepositionCase,
  prepositionCaseRegex,
} from "../../../../../entity/dictionary/word/inflection/PrepositionInflection"
import Ingester from "../../Ingester"

export default class Preposition extends Ingester {
  firstPrincipalPartName = Ingester.getPartOfSpeech(this.$, this.elt)

  async ingestInflection() {
    let other = this.$(this.elt).text().split("(+ ")[1]?.split(")")[0]
    if (!other || !other.length) return new PrepositionInflection("accusative")
    let prepositionCase = other.match(prepositionCaseRegex)?.[0] || ""
    return new PrepositionInflection(prepositionCase as PrepositionCase, other)
  }

  async ingestForms() {
    return null
  }
}
