import fs from "fs-extra"
import { getConnection } from "typeorm"
import Author from "../../../server/src/entity/literature/Author"
import Book from "../../../server/src/entity/literature/Book"
import ingestText from "./ingestText"

export default async function ingestBook(author: Author, title: string) {
  const Books = getConnection().getRepository(Book)
  const book = await Books.save({
    title,
    author,
  })
  const titles = fs.readdirSync(
    `data/literature/${author.name}/${book.title}`,
  ) as string[]
  for (const title of titles) {
    await ingestText(author, book, title)
  }
}
