import { getConnection } from 'typeorm'

import Author from '../../../server/entity/literature/Author'
import Book from '../../../server/entity/literature/Book'
import Text from '../../../server/entity/literature/Text'
import ingestLines from './ingestLines'

export default async function ingestText(
  author: Author,
  book: Book | undefined,
  title: string,
): Promise<void> {
  const Texts = getConnection().getRepository(Text)
  title = title.replace(/\.txt$/, '')
  let id = author.id
  if (book) id += '_' + book.title
  id += '_' + title
  const text = await Texts.save({
    id,
    title,
    author,
    book,
  })
  await ingestLines(text)
}
