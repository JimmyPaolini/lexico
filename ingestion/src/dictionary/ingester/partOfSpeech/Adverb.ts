import AdverbForms from '../../../../../server/entity/dictionary/word/forms/AdverbForms'
import AdverbInflection from '../../../../../server/entity/dictionary/word/inflection/AdverbInflection'
import Ingester from '../../Ingester'

export default class Adverb extends Ingester {
  firstPrincipalPartName = 'positive'

  async ingestInflection() {
    if (!this.principalParts) await this.ingestPrincipalParts()
    return this.principalParts.length > 1
      ? new AdverbInflection('descriptive')
      : new AdverbInflection('conjunctional')
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
