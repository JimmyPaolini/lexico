import Ingester from "../../Ingester"

export default class Adjective extends Ingester {
  firstPrincipalPartName() {
    return "masculine"
  }

  ingestInflection($, elt) {
    const inflectionHtml = $(elt)
      .nextUntil("h3", ':header:contains("Declension")')
      .first()
      .next()
    if (!$(inflectionHtml).length) throw new Error(`no inflection`)
    this.inflection = $(inflectionHtml)
      .text()
      .replace(
        /(-declension)|(declension)|(adjective)|(participle)|(numeral)|[.\d\[\]]/gi,
        "",
      )
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim()

    if (!this.inflection.length) this.inflection = "uninflected"
  }
}
