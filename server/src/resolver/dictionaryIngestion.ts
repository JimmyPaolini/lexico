import { Arg, Mutation, Resolver } from "type-graphql"
import { FindManyOptions, getConnection, Like } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Translation from "../entity/dictionary/Translation"
import Word from "../entity/dictionary/Word"
import ingestDictionary from "../ingestion/dictionary/ingestDictionary"
import ingestEntries from "../ingestion/dictionary/ingestEntry"
import { ingestTranslationReference } from "../ingestion/dictionary/ingestTranslationReferences"
import { ingestWords } from "../ingestion/dictionary/ingestWord"
import ingestWiktionary from "../ingestion/wiktionary/ingestWiktionary"
import logger from "../utils/log"
import { escapeCapitals, validateLetters } from "../utils/string"

const log = logger.getChildLogger()

@Resolver()
export default class DictionaryIngestionResolver {
  Entries = getConnection().getRepository(Entry)
  Words = getConnection().getRepository(Word)
  Translations = getConnection().getRepository(Translation)

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
    // await backupDatabase("dictionary-ingestion")
    return true
  }

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
        await ingestWords(entry)
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
    const entries = await this.Entries.find({ word })
    for (const entry of entries) await ingestWords(entry)
    return true
  }

  @Mutation(() => Boolean)
  async ingestWiktionary() {
    await ingestWiktionary()
    return true
  }
}
