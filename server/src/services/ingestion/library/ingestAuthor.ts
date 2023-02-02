import fs from 'fs-extra'

import Author from '../../../entity/library/Author'
import ingestBook from './ingestBook'
import ingestText from './ingestText'
import { authorIdToName } from './literatureMaps'

export default async function ingestAuthor(id: string): Promise<void> {
  const author = await Author.save({
    id,
    name: authorIdToName[id],
  })
  const bookOrTextTitles = fs.readdirSync(
    `../data/literature/${author.id}`
  ) as string[]
  for (const title of bookOrTextTitles) {
    const isBook = fs
      .lstatSync(`../data/literature/${author.id}/${title}`)
      .isDirectory()
    if (isBook) await ingestBook(author, title)
    else await ingestText(author, undefined, title)
  }
}
