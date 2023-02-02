import { hasSuffix, normalize } from './string'
import Entry from '../entity/dictionary/Entry'

const identifiablePartsOfSpeech = [
  'noun',
  'properNoun',
  'verb',
  'adjective',
  'adverb',
  'participle',
  'numeral',
  'suffix',
]

export default function identifyEntryWord(word: string, entry: Entry): Entry {
  if (!identifiablePartsOfSpeech.includes(entry.partOfSpeech)) return entry
  if (hasSuffix(word, 'que')) word = word.replace(/que$/i, '')
  else if (hasSuffix(word, 've')) word = word.replace(/ve$/i, '')
  else if (hasSuffix(word, 'ne')) word = word.replace(/ne$/i, '')
  entry.identifiers = identifyWordRecursive(
    word,
    entry.forms as Record<string, unknown>,
    [],
    []
  )
  return entry
}

function identifyWordRecursive(
  word: string,
  forms: Record<string, unknown> | null | undefined,
  current: string[],
  identifiers: string[]
) {
  if (Array.isArray(forms)) {
    if (
      forms.some((form) =>
        normalize(form).match(new RegExp('^' + word + '$', 'i'))
      )
    ) {
      return [...identifiers, current.join(' ')]
    }
  } else {
    for (const identifier in forms) {
      identifiers = identifyWordRecursive(
        word,
        forms[identifier] as Record<string, unknown>,
        [...current, identifier],
        identifiers
      )
    }
  }
  return identifiers
}
