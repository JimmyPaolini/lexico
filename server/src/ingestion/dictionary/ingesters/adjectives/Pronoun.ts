import Adjective from "./Adjective"

export default class Pronoun extends Adjective {
  ingestInflection($, elt) {
    if (!$(elt).text().includes(";")) throw new Error(`no inflection`)
    this.inflection = $(elt).text().split("; ")[1]
    this.inflection = this.inflection
      .replace("pronoun", "")
      .replace("-", "")
      .replace("declension", "")
      .replace(/\s+/g, " ")
      .trim()
  }
}
