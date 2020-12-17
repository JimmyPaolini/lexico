import { getConnection } from "typeorm"
import Word from "../../../../entity/Word"
import Ingester from "../../Ingester"
import { insertForm } from "../forms"

export default class Adverb extends Ingester {
  firstPrincipalPartName = "positive"

  ingestInflection() {
    let inflection =
      this.principalParts.length > 1 ? "descriptive" : "conjunctional"
    return inflection
  }

  async ingestForms() {
    let disorganizedForms = []
    for (const pp of this.principalParts.slice(1)) {
      for (const word of pp.text.split(" or ")) {
        disorganizedForms.push({
          word: [word],
          identifiers: [pp.name],
        })
      }
    }
    const Words = getConnection().getRepository(Word)
    for (const inflection of JSON.parse(JSON.stringify(disorganizedForms))) {
      for (const wordString of inflection.word) {
        await insertForm(wordString, this.word, Words)
      }
    }

    return null
  }
}
