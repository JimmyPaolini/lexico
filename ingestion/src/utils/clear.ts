import { EntityTarget, getConnection } from 'typeorm'

import Entry from '../../../server/src/entity/dictionary/Entry'
import Translation from '../../../server/src/entity/dictionary/Translation'
import Word from '../../../server/src/entity/dictionary/Word'
import Author from '../../../server/src/entity/library/Author'
import Book from '../../../server/src/entity/library/Book'
import Line from '../../../server/src/entity/library/Line'
import Text from '../../../server/src/entity/library/Text'
import User from '../../../server/src/entity/user/User'
import log from '../../../utils/log'

export async function clearEntity(
  Entity: EntityTarget<unknown>,
): Promise<void> {
  await getConnection().getRepository(Entity).delete({})
}

export async function clearDictionary(): Promise<void> {
  log.info('clearing dictionary')
  await clearEntity(Word)
  await clearEntity(Translation)
  await clearEntity(Entry)
  log.info('cleared dictionary')
}

export async function clearLiterature(): Promise<void> {
  log.info('clearing library')
  await clearEntity(Line)
  await clearEntity(Text)
  await clearEntity(Book)
  await clearEntity(Author)
  log.info('cleared library')
}

export async function clearUsers(): Promise<void> {
  log.info('clearing users')
  await clearEntity(User)
  log.info('cleared users')
}

export async function clearIngested(): Promise<void> {
  log.info('clearing ingested')
  await clearDictionary()
  await clearLiterature()
  log.info('cleared ingested')
}

export async function clearAll(): Promise<void> {
  log.info('clearing all')
  await clearDictionary()
  await clearLiterature()
  await clearUsers()
  log.info('cleared all')
}
