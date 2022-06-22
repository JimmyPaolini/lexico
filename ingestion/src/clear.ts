import { getConnection } from 'typeorm'

import Entry from '../../entity/dictionary/Entry'
import Translation from '../../entity/dictionary/Translation'
import Word from '../../entity/dictionary/Word'
import Author from '../../entity/literature/Author'
import Book from '../../entity/literature/Book'
import Line from '../../entity/literature/Line'
import Text from '../../entity/literature/Text'
import User from '../../entity/user/User'
import { connectDatabase } from '../../utils/database'
import {
  clearAll,
  clearDictionary,
  clearEntity,
  clearIngested,
  clearLiterature,
} from './utils/clear'

async function main() {
  const command = process.argv[2]
  if (!command) throw new Error('no command')

  await connectDatabase()

  const instructions = {
    entries: async () => await clearEntity(Entry),
    translations: async () => await clearEntity(Translation),
    words: async () => await clearEntity(Word),
    dictionary: clearDictionary,

    authors: async () => await clearEntity(Author),
    books: async () => await clearEntity(Book),
    texts: async () => await clearEntity(Text),
    lines: async () => await clearEntity(Line),
    literature: clearLiterature,

    ingested: clearIngested,

    users: async () => await clearEntity(User),
    bookmarks: async () =>
      await getConnection().query(`DELETE FROM "user_bookmarks_entry"`),

    all: clearAll,
  } as { [key: string]: () => unknown }

  if (!(command in instructions)) throw new Error('unknown command')
  await instructions[command]()
  process.exit()
}
main()
