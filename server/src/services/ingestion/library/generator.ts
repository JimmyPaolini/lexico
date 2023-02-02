import { ObjectLiteral } from 'typeorm'

import Author from '../../../entity/library/Author'
import Book from '../../../entity/library/Book'
import Line from '../../../entity/library/Line'
import Text from '../../../entity/library/Text'
import { normalize } from '../../string'

async function* getLineGeneratorSearch(
  where: ObjectLiteral
): AsyncGenerator<Line> {
  const take = 100
  for (
    let skip = 0,
      lines = await Line.find({
        take,
        skip,
        where,
        order: { id: 'ASC' },
        select: ['id', 'line'],
      });
    lines.length;
    skip += take,
      lines = await Line.find({
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

export function* getWordGenerator(text: string): Generator<string> {
  const words = normalize(text).match(/\w+/gi)
  if (!words) return
  for (const word of words) yield word
}
