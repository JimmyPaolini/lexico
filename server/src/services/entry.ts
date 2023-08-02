import Entry from '../entity/dictionary/Entry'
import VerbForms from '../entity/dictionary/word/forms/VerbForms'
import {
  camelCaseFuturePerfect,
  determinerFormsToAdjectiveForms,
  isDeterminerForms,
} from './forms'

export function processEntry(entry: Entry) {
  if (entry.partOfSpeech === 'verb' && entry.forms) {
    entry.forms = camelCaseFuturePerfect(entry.forms as VerbForms)
  }
  if (
    ['pronoun', 'determiner'].includes(entry.partOfSpeech) &&
    isDeterminerForms(entry.forms)
  ) {
    entry.forms = determinerFormsToAdjectiveForms(entry.forms)
  }
  return entry
}
