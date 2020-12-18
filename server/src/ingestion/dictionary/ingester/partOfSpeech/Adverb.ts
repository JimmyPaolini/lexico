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
    let forms
    if (pp.length === 1) forms = new AdverbForms(pp[0].text)
    else if (pp.length === 2) forms = new AdverbForms(pp[0].text, pp[1].text)
    else forms = new AdverbForms(pp[0].text, pp[1].text, pp[2].text)
    return forms
  }
}
