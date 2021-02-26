import { getConnection } from "typeorm"
import Author from "../../../server/src/entity/literature/Author"
import Book from "../../../server/src/entity/literature/Book"
import Text from "../../../server/src/entity/literature/Text"
import ingestLines from "./ingestLines"

export default async function ingestText(
  author: Author,
  book: Book | undefined,
  title: string,
) {
  const Texts = getConnection().getRepository(Text)
  const text = await Texts.save({
    title: title.replace(/\.txt$/, ""),
    author,
    book,
  })
  await ingestLines(text)
}
