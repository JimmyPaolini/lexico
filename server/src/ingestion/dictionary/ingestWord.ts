import { Logger } from "tslog"
import { getConnection } from "typeorm"
import Entry from "../../entity/Entry"
import Word from "../../entity/Word"
import flattenForms from "../../utils/flattenForms"
import { normalize } from "../../utils/string"

const log = new Logger()

export async function getEntryForms(entry: Entry) {
  log.info("ingesting forms", entry.word)
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
  const word = normalize(form)
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
    // await Words.insert({ word, entries: [entry] })
    await Words.createQueryBuilder()
      .insert()
      .values({ word, entries: [entry] })
      .updateEntity(false)
      .execute()
  }
}
