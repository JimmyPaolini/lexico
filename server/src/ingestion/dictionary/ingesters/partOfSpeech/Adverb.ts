import Ingester from "../../Ingester"

export default class Adverb extends Ingester {
  firstPrincipalPartName = "positive"

  ingestInflection() {
    let inflection =
      this.principalParts.length > 1 ? "descriptive" : "conjunctional"
    return inflection
  }

  ingestForms() {
    let disorganizedForms = []
    for (const pp of this.principalParts.slice(1)) {
      for (const word of pp.text.split(" or ")) {
        disorganizedForms.push({
          word: [word],
          identifiers: [pp.name],
        })
      }
    }
    return null
  }
}
