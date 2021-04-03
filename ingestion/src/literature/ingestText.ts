import { getConnection } from "typeorm"
import Author from "../../../entity/literature/Author"
import Book from "../../../entity/literature/Book"
import Text from "../../../entity/literature/Text"
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
