import { EntityTarget, getConnection } from "typeorm"
import Entry from "../../../entity/dictionary/Entry"
import Translation from "../../../entity/dictionary/Translation"
import Word from "../../../entity/dictionary/Word"
import Author from "../../../entity/literature/Author"
import Book from "../../../entity/literature/Book"
import Line from "../../../entity/literature/Line"
import Text from "../../../entity/literature/Text"
import User from "../../../entity/user/User"
import log from "../../../utils/log"

export async function clearEntity(Entity: EntityTarget<unknown>) {
  await getConnection().getRepository(Entity).delete({})
}

export async function clearDictionary() {
  log.info(`clearing dictionary`)
  await clearEntity(Word)
  await clearEntity(Translation)
  await clearEntity(Entry)
  log.info(`cleared dictionary`)
}

export async function clearLiterature() {
  log.info(`clearing literature`)
  await clearEntity(Line)
  await clearEntity(Text)
  await clearEntity(Book)
  await clearEntity(Author)
  log.info(`cleared literature`)
}

export async function clearUsers() {
  log.info(`clearing users`)
  await clearEntity(User)
  log.info(`cleared users`)
}

export async function clearAll() {
  log.info(`clearing all`)
  await clearDictionary()
  await clearLiterature()
  await clearUsers()
  log.info(`cleared all`)
}
