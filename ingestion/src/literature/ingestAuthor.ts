import fs from "fs-extra"
import { getConnection } from "typeorm"
import Author from "../../../server/src/entity/literature/Author"
import ingestBook from "./ingestBook"
import ingestText from "./ingestText"
import { authorNameToFullname } from "./literatureMaps"

export default async function ingestAuthor(name: string) {
  const Authors = getConnection().getRepository(Author)
  const author = await Authors.save({
    name,
    fullname: authorNameToFullname[name],
  })
  const bookOrTextTitles = fs.readdirSync(
    `data/literature/${author.name}`,
  ) as string[]
  for (const title of bookOrTextTitles) {
    const isBook = fs
      .lstatSync(`data/literature/${author.name}/${title}`)
      .isDirectory()
    if (isBook) await ingestBook(author, title)
    else await ingestText(author, undefined, title)
  }
}
