import Adjective from "./Adjective"

export default class Prefix extends Adjective {
  ingestInflection() {
    return ""
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
