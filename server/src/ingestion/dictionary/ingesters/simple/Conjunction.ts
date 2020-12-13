import Ingester from "../../Ingester"

export default class Conjunction extends Ingester {
  firstPrincipalPartName() {
    return this.partOfSpeech
  }
  ingestInflection($, elt) {
    this.inflection = "uninflected"
  }
  ingestForms($, elt) {}
}
