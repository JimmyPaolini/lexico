import { getConnection } from 'typeorm'

import Entry from '../../../entity/dictionary/Entry'
import Word from '../../../entity/dictionary/Word'
import { escapeCapitals, normalize } from '../../../utils/string'
import { flattenForms } from '../utils/forms'

export async function ingestEntryWords(entry: Entry): Promise<void> {
  for (const word of getEntryWords(entry)) {
    await ingestEntryWord(word, entry)
  }
}

export function getEntryWords(entry: Entry): string[] {
  const forms = flattenForms(entry.forms as any)
  entry.principalParts?.forEach((pp) => forms.push(...pp.text))
  return forms
}

export async function ingestEntryWord(
  word: string,
  entry: Entry,
): Promise<void> {
  const Words = getConnection().getRepository(Word)
  word = escapeCapitals(normalize(word))
  if (!word.match(/^-?[A-Za-z]/)) return
  const existingWord = await Words.findOne({ word })
  if (existingWord) {
    if (!existingWord.entries.some((e) => e.id === entry.id)) {
      existingWord.entries.push(entry)
      await Words.save(existingWord)
    }
  } else {
    await Words.save({ word, entries: [entry] })
  }
}
