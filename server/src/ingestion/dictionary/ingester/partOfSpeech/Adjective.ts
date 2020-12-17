import Ingester from "../../Ingester"

export default class Adjective extends Ingester {
  firstPrincipalPartName = "masculine"

  ingestInflection() {
    const $ = this.$
    const elt = this.elt
    const inflectionHtml = $(elt)
      .nextUntil("h3", ':header:contains("Declension")')
      .first()
      .next()
    if (!$(inflectionHtml).length) throw new Error(`no inflection`)
    let inflection = $(inflectionHtml)
      .text()
      .replace(
        /(-declension)|(declension)|(adjective)|(participle)|(numeral)|[.\d\[\]]/gi,
        "",
      )
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim()

    if (!inflection.length) return "uninflected"
    return inflection
  }
}
