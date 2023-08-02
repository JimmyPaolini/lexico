import { getConnection } from 'typeorm'

import Entry from '../../server/src/entity/dictionary/Entry'
import { Database } from '../../server/src/utils/database'
import { escapeCapitals } from '../../utils/string'
import ingestEntries from './dictionary/ingestEntries'
import ingestEntryWord from './dictionary/ingestEntry'
import { ingestEntryWords } from './dictionary/ingestEntryWords'
import ingestManual from './dictionary/ingestManual'
import ingestTranslationReferences from './dictionary/ingestTranslationReferences'
import ingestWords from './dictionary/ingestWords'
import ingestBible from './literature/ingestBible'
import ingestLiterature from './literature/ingestLiterature'
import ingestWiktionary from './wiktionary/ingestWiktionary'

async function main() {
  const command = process.argv[2]
  if (!command) throw new Error('no command')

  await Database.initialize()

  const instructions = {
    wiktionary: async () => await ingestWiktionary(),
    entries: async () => await ingestEntries(),
    words: async () => await ingestWords(),
    translationReferences: async () => await ingestTranslationReferences(),
    dictionary: async () => {
      await ingestEntries()
      await Promise.all([ingestTranslationReferences(), ingestWords()])
    },
    entry: async () => {
      const Entries = getConnection().getRepository(Entry)
      const word = process.argv[3]
      if (!word) throw new Error('no word')
      await ingestEntryWord(escapeCapitals(word))
      const entries = await Entries.find({
        where: `entry.id ~* '${escapeCapitals(word) + ':\\d'}'`,
      })
      for (const entry of entries) await ingestEntryWords(entry)
    },
    literature: async () => await ingestLiterature(),
    manual: async () => await ingestManual(),
    bible: async () =>
      await Promise.all([
        ingestBible('https://vulgate.org/', 'https://vulgate.org/'),
        ingestBible(
          'https://vulgate.org/nt/gospel/',
          'https://vulgate.org/nt/gospel/matthew_1.htm'
        ),
      ]),
  } as Record<string, () => unknown>

  if (!(command in instructions)) throw new Error('unknown command')
  await instructions[command]()
  process.exit()
}
void main()
