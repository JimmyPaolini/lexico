import { readdirSync } from "fs"
import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { FindManyOptions, getConnection, Like } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Translation from "../entity/dictionary/Translation"
import Word from "../entity/dictionary/Word"
import ingestDictionary from "../ingestion/dictionary/ingestDictionary"
import ingestEntries from "../ingestion/dictionary/ingestEntry"
import { ingestTranslationReference } from "../ingestion/dictionary/ingestTranslationReferences"
import { getEntryForms } from "../ingestion/dictionary/ingestWord"
import ingestWiktionary, {
  categories,
} from "../ingestion/wiktionary/ingestWiktionary"
import {
  backupDatabase,
  backupFileNameExtension,
  restoreDatabase,
} from "../utils/database"
import logger from "../utils/log"
import { escapeCapitals } from "../utils/string"

const log = logger.getChildLogger()

@Resolver()
export default class DictionaryIngestionResolver {
  Entries = getConnection().getRepository(Entry)
  Words = getConnection().getRepository(Word)
  Translations = getConnection().getRepository(Translation)

  @Mutation(() => Boolean)
  async ingestEntries(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    validateLetters([firstLetter, lastLetter])
    log.info("Ingesting Entries")
    await ingestDictionary(firstLetter, lastLetter)
    log.info("Ingested Entries")
    return true
  }

  @Mutation(() => Boolean)
  async ingestWords(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    validateLetters([firstLetter, lastLetter])
    log.info("Ingesting Words")
    const params = {
      where: `"word" ~* '^-?[${firstLetter}-${lastLetter}]'`,
      order: { word: "ASC" },
      take: 100,
    } as FindManyOptions<Entry>
    let skip = 0
    let entries = await this.Entries.find({ ...params, skip })
    while (entries.length) {
      log.info("selected", entries.length, "from entry", skip, entries[0].word)
      for (const entry of entries) {
        await getEntryForms(entry)
      }
      skip += params.take as number
      entries = await this.Entries.find({ ...params, skip })
    }
    log.info("Ingested Words")
    return true
  }

  @Mutation(() => Boolean)
  async ingestTranslationReferences() {
    log.info("Ingesting Translation References")
    const params = {
      where: { translation: Like("%{*%*}%") }, //`"translation" ~* '{\\*.*\\*}'`,
      order: { translation: "ASC" },
      relations: ["entry"],
      take: 100,
    } as FindManyOptions<Translation>
    let skip = 0
    let translations = await this.Translations.find({ ...params, skip })
    while (translations.length) {
      log.info(
        "selected",
        translations.length,
        "from translation",
        skip,
        translations[0].translation,
      )
      for (const translation of translations) {
        await ingestTranslationReference(translation)
      }
      skip += params.take as number
      translations = await this.Translations.find({ ...params, skip })
    }
    log.info("Ingested Translation References")
    return true
  }

  @Mutation(() => Boolean)
  async ingestEntry(@Arg("word") word: string) {
    await ingestEntries(escapeCapitals(word))
    return true
  }

  @Mutation(() => Boolean)
  async ingestDictionary(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    await this.ingestEntries(firstLetter, lastLetter)
    await Promise.all([
      this.ingestTranslationReferences(),
      this.ingestWords(firstLetter, lastLetter),
    ])
    await backupDatabase("dictionary-ingestion")
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
  async ingestWiktionary(
    @Arg("category") category: string,
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    if (!categories[category]) throw new Error("unknown category")
    validateLetters([firstLetter, lastLetter])
    await ingestWiktionary(category, firstLetter, lastLetter)
    return true
  }

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
}

function validateLetters(letters: string[]): void {
  for (const letter of letters) {
    if (!letter.match(/[a-z]/i)) throw new Error("invalid letter")
  }
}
