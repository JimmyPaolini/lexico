import Ingester from "../../Ingester"

export default class Noun extends Ingester {
  firstPrincipalPartName = "nominative"

  ingestInflection(): Inflection {
    const $ = this.$
    const elt = this.elt
    const inflectionHtml = $(elt)
      .nextUntil("h3", ':header:contains("Declension")')
      .first()
      .next()
    if (!$(inflectionHtml).length) throw new Error(`no inflection`)
    let inflection = $(inflectionHtml)
      .text()
      .replace(/(-declension)|(declension)|(noun)|[.\d\[\]]/gi, "")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim()

    if (!$(elt).children("span.gender").length) throw new Error("no gender")
    let gender = $(elt).children("span.gender").text()
    gender = gender
      .replace(/^m|m$/, "masculine")
      .replace(/^f|f$/, "feminine")
      .replace(/^n|n$/, "neuter")
      .replace("sg", "singular")
      .replace("pl", "plural")
    inflection += ", " + gender

    if (!inflection.length) inflection = "uninflected"
    return inflection
  }
}
