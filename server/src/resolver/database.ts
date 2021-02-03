import { readdirSync } from "fs"
import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Word from "../entity/dictionary/Word"
import Author from "../entity/literature/Author"
import Book from "../entity/literature/Book"
import Line from "../entity/literature/Line"
import Text from "../entity/literature/Text"
import {
  backupDatabase,
  backupFileNameExtension,
  restoreDatabase,
} from "../utils/database"
import logger from "../utils/log"
import { validateLetters } from "../utils/string"

const log = logger.getChildLogger()

@Resolver(Text)
export default class DatabaseResolver {
  Entries = getConnection().getRepository(Entry)
  Words = getConnection().getRepository(Word)
  Authors = getConnection().getRepository(Author)
  Books = getConnection().getRepository(Book)
  Texts = getConnection().getRepository(Text)
  Lines = getConnection().getRepository(Line)

  @Mutation(() => Boolean)
  async backupDatabase() {
    await backupDatabase("manual")
    return true
  }

  @Query(() => [String])
  backups() {
    return readdirSync(`data/backup`)
      .filter((fileName) => !fileName.match(/\.DS_Store/))
      .map((fileName) => fileName.replace(backupFileNameExtension, ""))
      .sort()
      .reverse()
  }

  @Mutation(() => Boolean)
  async restoreDatabase(@Arg("backupFileName") backupFileName: string) {
    await restoreDatabase(backupFileName)
    return true
  }

  @Mutation(() => Boolean)
  async restoreDatabaseFromLatestBackup() {
    const latestBackup = this.backups()[0]
    await restoreDatabase(latestBackup)
    return true
  }

  @Mutation(() => Boolean)
  async clearDictionary(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    await this.clearEntries(firstLetter, lastLetter)
    await this.clearWords(firstLetter, lastLetter)
    return true
  }

  @Mutation(() => Boolean)
  async clearEntries(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    validateLetters([firstLetter, lastLetter])
    log.info("Clearing entries")
    await this.Entries.createQueryBuilder()
      .delete()
      .where(`word ~* '^-?[${firstLetter}-${lastLetter}]'`)
      .execute()
    log.info("Cleared entries")
    return true
  }

  @Mutation(() => Boolean)
  async clearWords(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    validateLetters([firstLetter, lastLetter])
    log.info("Clearing words")
    await this.Words.createQueryBuilder()
      .delete()
      .where(`word ~* '^-?[${firstLetter}-${lastLetter}]'`)
      .execute()
    log.info("Cleared words")
    return true
  }

  @Mutation(() => Boolean)
  async clearLiterature() {
    log.info("clearing literature")
    await this.Lines.createQueryBuilder().delete().execute()
    await this.Texts.createQueryBuilder().delete().execute()
    await this.Books.createQueryBuilder().delete().execute()
    await this.Authors.createQueryBuilder().delete().execute()
    log.info("cleared literature")
    return true
  }
}
