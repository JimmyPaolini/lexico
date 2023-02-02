import Author from '../../../entity/library/Author'
import Book from '../../../entity/library/Book'
import Text from '../../../entity/library/Text'
import ingestLines from './ingestLines'

export default async function ingestText(
  author: Author,
  book: Book | undefined,
  title: string
): Promise<void> {
  title = title.replace(/\.txt$/, '')
  let id = author.id
  if (book) id += '_' + book.title
  id += '_' + title
  const text = await Text.save({
    id,
    title,
    author,
    book,
  })
  await ingestLines(text)
}
