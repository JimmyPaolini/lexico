import Ingester from "../../Ingester"

export default class Preposition extends Ingester {
  firstPrincipalPartName = Ingester.getPartOfSpeech(this.$, this.elt)

  ingestInflection() {
    let inflection = this.$(this.elt).text().split("(+ ")[1].split(")")[0]
    if (!inflection.length) return "accusative"
    return inflection
  }

  async ingestForms() {
    return null
  }
}
