import { getConnection } from "typeorm"
import Entry from "../../entity/dictionary/Entry"
import Translation from "../../entity/dictionary/Translation"
import Word from "../../entity/dictionary/Word"
import Author from "../../entity/literature/Author"
import Book from "../../entity/literature/Book"
import Line from "../../entity/literature/Line"
import Text from "../../entity/literature/Text"
import User from "../../entity/user/User"
import { connectDatabase } from "../../utils/database"

async function main() {
  const command = process.argv[2]
  if (!command) throw new Error("no command")

  await connectDatabase()

  const Entries = getConnection().getRepository(Entry)
  const Translations = getConnection().getRepository(Translation)
  const Words = getConnection().getRepository(Word)
  const Authors = getConnection().getRepository(Author)
  const Books = getConnection().getRepository(Book)
  const Texts = getConnection().getRepository(Text)
  const Lines = getConnection().getRepository(Line)
  const Users = getConnection().getRepository(User)

  const commandMap = {
    entries: () => Entries.createQueryBuilder().delete().execute(),
    translations: () => Translations.createQueryBuilder().delete().execute(),
    words: () => Words.createQueryBuilder().delete().execute(),
    dictionary: async () => {
      await Entries.createQueryBuilder().delete().execute()
      await Translations.createQueryBuilder().delete().execute()
      await Words.createQueryBuilder().delete().execute()
    },

    authors: () => Authors.createQueryBuilder().delete().execute(),
    books: () => Books.createQueryBuilder().delete().execute(),
    texts: () => Texts.createQueryBuilder().delete().execute(),
    lines: () => Lines.createQueryBuilder().delete().execute(),
    literature: async () => {
      await Authors.createQueryBuilder().delete().execute()
      await Books.createQueryBuilder().delete().execute()
      await Texts.createQueryBuilder().delete().execute()
      await Lines.createQueryBuilder().delete().execute()
    },

    users: () => Users.createQueryBuilder().delete().execute(),
    bookmarks: () =>
      getConnection().query(`DELETE FROM "user_bookmarks_entry"`),
  } as { [key: string]: () => any }

  if (!(command in commandMap)) throw new Error("unknown command")
  await commandMap[command]()
  return
}
main()
