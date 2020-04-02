const Adjective = require("./Adjective")

class Prefix extends Adjective {
    partOfSpeech = 'prefix'
    ingestInflection($, elt) {}

    ingestForms($, elt) {
        // const derivedTerms = $(elt).nextAll('.derivedterms').first()
        //     .find('.CategoryTreeSection .CategoryTreeChildren')
        // if (!derivedTerms.length) throw new Error(`no forms`)
        // const derived = []
        // for (const term of derivedTerms) console.log($(term).find('div.CategoryTreeItem a').attr('title'))
        // this.forms = {derived}
    }
}

module.exports = Prefix