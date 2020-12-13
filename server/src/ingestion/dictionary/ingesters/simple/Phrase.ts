import Ingester from "../../Ingester"

export default class Phrase extends Ingester {
  firstPrincipalPartName() {
    return this.partOfSpeech
  }
  ingestInflection($, elt) {
    this.inflection = "uninflected"
  }
  ingestForms($, elt) {}
}
