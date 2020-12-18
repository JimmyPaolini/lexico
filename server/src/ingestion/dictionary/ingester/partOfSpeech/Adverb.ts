import AdverbForms from "../../../../entity/word/forms/AdverbForms"
import AdverbInflection from "../../../../entity/word/inflection/AdverbInflection"
import Ingester from "../../Ingester"

export default class Adverb extends Ingester {
  firstPrincipalPartName = "positive"

  ingestInflection() {
    if (!this.principalParts) this.ingestPrincipalParts()
    if (this.principalParts.length === 1)
      return new AdverbInflection("conjunctional")
    return this.principalParts.length > 1
      ? new AdverbInflection("descriptive")
      : new AdverbInflection("conjunctional")
  }

  async ingestForms() {
    const pp = this.principalParts || this.ingestPrincipalParts()
    if (pp.length === 1) return new AdverbForms(pp[0].text)
    if (pp.length === 2) return new AdverbForms(pp[0].text, pp[1].text)
    return new AdverbForms(pp[0].text, pp[1].text, pp[2].text)

    // const Words = getConnection().getRepository(Word)
    // for (const inflection of JSON.parse(JSON.stringify(disorganizedForms))) {
    //   for (const wordString of inflection.word) {
    //     await insertForm(wordString, this.word, Words)
    //   }
    // }
  }
}
