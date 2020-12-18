import AdjectiveInflection, {
  AdjectiveDeclension,
  AdjectiveDegree,
  adjectiveDegreeRegex,
  adjectiveDelensionRegex,
} from "../../../../entity/word/inflection/AdjectiveInflection"
import Ingester from "../../Ingester"

export default class Adjective extends Ingester {
  firstPrincipalPartName = "masculine"

  ingestInflection(): AdjectiveInflection | null {
    const $ = this.$
    const elt = this.elt
    const inflectionHtml = $(elt)
      .nextUntil("h3", ':header:contains("Declension")')
      .first()
      .next()
    if (!$(inflectionHtml).length) throw new Error(`no inflection`)
    let declension = $(inflectionHtml)
      .text()
      .replace(
        /(-declension)|(declension)|(adjective)|(participle)|(numeral)|[.\d\[\]]/gi,
        "",
      )
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim()

    if (!declension.length) return new AdjectiveInflection()
    let other = declension
    let degree = declension.match(adjectiveDegreeRegex)?.[0] || ""
    declension = declension.match(adjectiveDelensionRegex)?.[0] || ""
    return new AdjectiveInflection(
      declension as AdjectiveDeclension,
      degree as AdjectiveDegree,
      other,
    )
  }
}
