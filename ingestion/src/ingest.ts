import { getConnection } from "typeorm"
import Entry from "../../server/src/entity/dictionary/Entry"
import ingestEntries from "./dictionary/ingestEntries"
import ingestEntryWord from "./dictionary/ingestEntry"
import { ingestEntryWords } from "./dictionary/ingestEntryWords"
import ingestTranslationReferences from "./dictionary/ingestTranslationReferences"
import ingestWords from "./dictionary/ingestWords"
import ingestLiterature from "./literature/ingestLiterature"
import { connectDatabase } from "./utils/database"
import { escapeCapitals } from "./utils/string"
import ingestWiktionary from "./wiktionary/ingestWiktionary"

async function main() {
  const command = process.argv[2]
  if (!command) throw new Error("no command")

  await connectDatabase()

  const commandMap = {
    wiktionary: () => ingestWiktionary(),
    entries: () => ingestEntries(),
    words: () => ingestWords(),
    translationReferences: () => ingestTranslationReferences(),
    dictionary: async () => {
      await ingestEntries()
      await Promise.all([ingestTranslationReferences(), ingestWords()])
    },
    entry: async () => {
      const Entries = getConnection().getRepository(Entry)
      const word = process.argv[3]
      if (!word) throw new Error("no word")
      ingestEntryWord(escapeCapitals(word))
      const entries = await Entries.find({ word })
      for (const entry of entries) await ingestEntryWords(entry)
    },
    literature: () => ingestLiterature(),
  } as { [key: string]: () => any }

  if (!(command in commandMap)) throw new Error("unknown command")
  await commandMap[command]()
  return
}
main()
