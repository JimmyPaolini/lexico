import { getConnection } from "typeorm"
import Entry from "../../entity/dictionary/Entry"
import Word from "../../entity/dictionary/Word"
import { flattenForms } from "../../utils/forms"
import { escapeCapitals, normalize } from "../../utils/string"

export async function ingestWords(entry: Entry) {
  // log.info("ingesting words", entry.word)
  for (const form of getForms(entry)) {
    await ingestWord(form, entry)
  }
}

export function getForms(entry: Entry): string[] {
  const forms = flattenForms(entry.forms)
  entry.principalParts?.forEach((pp) => forms.push(...pp.text))
  return forms
}

export async function ingestWord(form: string, entry: Entry) {
  const Words = getConnection().getRepository(Word)
  const word = escapeCapitals(normalize(form))
  if (!word.match(/^-?[A-Za-z]/)) return
  const existingWord = await Words.findOne({ word })
  if (existingWord) {
    if (
      !existingWord.entries.some(
        (existingEntry) => existingEntry.id === entry.id,
      )
    ) {
      await Words.createQueryBuilder()
        .relation(Word, "entries")
        .of(existingWord)
        .add(entry)
    }
  } else {
    await Words.createQueryBuilder()
      .insert()
      .values({ word, entries: [entry] })
      .updateEntity(false)
      .execute()
  }
}
