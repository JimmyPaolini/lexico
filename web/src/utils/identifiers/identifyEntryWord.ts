import { Entry, Forms, Maybe } from 'src/graphql/generated'

import { hasSuffix, normalize } from '../string'

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

export function identifyEntryWord(word: string, entry: Entry): Entry {
  if (!identifiablePartsOfSpeech.includes(entry.partOfSpeech)) return entry
  if (hasSuffix(word, 'que')) word = word.replace(/que$/i, '')
  else if (hasSuffix(word, 've')) word = word.replace(/ve$/i, '')
  else if (hasSuffix(word, 'ne')) word = word.replace(/ne$/i, '')
  entry.identifiers = identifyWordRecursive(word, entry.forms, [], [])
  return entry
}

function identifyWordRecursive(
  word: string,
  forms: Maybe<Forms> | undefined,
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
    for (const key in forms) {
      identifiers = identifyWordRecursive(
        word,
        forms[key as keyof Forms],
        [...current, key],
        identifiers
      )
    }
  }
  return identifiers
}
