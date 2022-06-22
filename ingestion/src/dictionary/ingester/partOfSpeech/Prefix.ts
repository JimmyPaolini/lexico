import Uninflected from '../../../../../entity/dictionary/word/inflection/Uninflected'
import Adjective from './Adjective'

export default class Prefix extends Adjective {
  async ingestInflection() {
    return new Uninflected()
  }

  async ingestForms() {
    // const derivedTerms = $(elt).nextAll('.derivedterms').first()
    //     .find('.CategoryTreeSection .CategoryTreeChildren')
    // if (!derivedTerms.length) throw new Error(`no forms`)
    // const derived = []
    // for (const term of derivedTerms) console.log($(term).find('div.CategoryTreeItem a').attr('title'))
    // this.forms = {derived}
    return null
  }
}
