import Adjective from "./Adjective"

export default class Pronoun extends Adjective {
  ingestInflection() {
    const $ = this.$
    const elt = this.elt
    if (!$(elt).text().includes(";")) throw new Error(`no inflection`)
    let inflection = $(elt)
      .text()
      .split("; ")[1]
      .replace("pronoun", "")
      .replace("-", "")
      .replace("declension", "")
      .replace(/\s+/g, " ")
      .trim()
    return inflection
  }
}
