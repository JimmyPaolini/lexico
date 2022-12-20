import { ObjectLiteral, getConnection } from 'typeorm'

import Author from '../../../server/src/entity/literature/Author'
import Book from '../../../server/src/entity/literature/Book'
import Line from '../../../server/src/entity/literature/Line'
import Text from '../../../server/src/entity/literature/Text'
import { connectDatabase } from '../../../server/src/utils/database'
import { normalize } from '../../../web/src/utils/string'

async function * getLineGeneratorSearch(
  where: ObjectLiteral,
): AsyncGenerator<Line> {
  let connection
  try {
    connection = getConnection()
  } catch {
    connection = await connectDatabase()
  }
  const Lines = connection.getRepository(Line)
  const take = 100
  for (
    let skip = 0,
      lines = await Lines.find({
        take,
        skip,
        where,
        order: { id: 'ASC' },
        select: ['id', 'line'],
      });
    lines.length;
    skip += take,
      lines = await Lines.find({
        where,
        skip,
        take,
        order: { id: 'ASC' },
        select: ['id', 'line'],
      })
  ) {
    for (const line of lines) yield line
  }
}

export function getLineGenerator(): AsyncGenerator<Line> {
  return getLineGeneratorSearch({})
}

export function getLineGeneratorByText(text: Text): AsyncGenerator<Line> {
  return getLineGeneratorSearch({ text })
}

export function getLineGeneratorByBook(book: Book): AsyncGenerator<Line> {
  return getLineGeneratorSearch({ book })
}

export function getLineGeneratorByAuthor(author: Author): AsyncGenerator<Line> {
  return getLineGeneratorSearch({ author })
}

export function * getWordGenerator(text: string): Generator<string> {
  const words = normalize(text).match(/\w+/gi)
  if (!words) return
  for (const word of words) yield word
}
