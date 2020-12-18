import AdjectiveInflection, {
  AdjectiveDeclension,
  adjectiveDelensionRegex,
} from "../../../../entity/word/inflection/AdjectiveInflection"
import Adjective from "./Adjective"

export default class Pronoun extends Adjective {
  ingestInflection() {
    const $ = this.$
    const elt = this.elt
    if (!$(elt).text().includes(";")) throw new Error(`no inflection`)
    let declension = $(elt)
      .text()
      .split("; ")[1]
      .replace("pronoun", "")
      .replace("-", "")
      .replace("declension", "")
      .replace(/\s+/g, " ")
      .trim()

    if (!declension.length) return new AdjectiveInflection()
    declension = declension.match(adjectiveDelensionRegex)?.[0] || ""
    return new AdjectiveInflection(declension as AdjectiveDeclension)
  }
}
