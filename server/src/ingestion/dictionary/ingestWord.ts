import { getConnection } from "typeorm"
import Entry from "../../entity/dictionary/Entry"
import Word from "../../entity/dictionary/Word"
import { flattenForms } from "../../utils/forms"
import { escapeCapitals, normalize } from "../../utils/string"

export async function ingestWords(entry: Entry) {
  // log.info("ingesting words", entry.word)
  for (const word of getWords(entry)) {
    await ingestWord(word, entry)
  }
}

export function getWords(entry: Entry): string[] {
  const forms = flattenForms(entry.forms)
  entry.principalParts?.forEach((pp) => forms.push(...pp.text))
  return forms
}

export async function ingestWord(word: string, entry: Entry) {
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
