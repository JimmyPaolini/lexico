import Ingester from "../../Ingester"

export default class Conjunction extends Ingester {
  firstPrincipalPartName = Ingester.getPartOfSpeech(this.$, this.elt)

  ingestInflection() {
    return "uninflected"
  }

  ingestForms() {
    return null
  }
}
