import Ingester from "../Ingester"

export default class Preposition extends Ingester {
  firstPrincipalPartName() {
    return this.partOfSpeech
  }

  ingestInflection($, elt) {
    this.inflection = $(elt).text().split("(+ ")[1].split(")")[0]
    if (!this.inflection.length) this.inflection = "accusative"
  }

  ingestForms($, elt) {}
}
