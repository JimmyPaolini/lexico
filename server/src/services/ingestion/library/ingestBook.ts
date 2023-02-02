import fs from 'fs-extra'

import Author from '../../../entity/library/Author'
import Book from '../../../entity/library/Book'
import ingestText from './ingestText'

export default async function ingestBook(
  author: Author,
  title: string
): Promise<void> {
  const book = await Book.save({
    id: `${author.id}_${title}`,
    title,
    author,
  })
  const titles = fs.readdirSync(
    `../data/literature/${author.id}/${book.title}`
  ) as string[]
  for (const title of titles) {
    await ingestText(author, book, title)
  }
}
