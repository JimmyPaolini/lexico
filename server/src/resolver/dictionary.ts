import { Arg, Query, Resolver } from "type-graphql"
import { getConnection, Like } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Translation from "../entity/dictionary/Translation"
import Word from "../entity/dictionary/Word"
import { identifyWord } from "../utils/forms"
import logger from "../utils/log"
import { getMacronOptionRegex } from "../utils/string"

const log = logger.getChildLogger()

@Resolver(Entry)
export default class DictionaryResolver {
  Entries = getConnection().getRepository(Entry)
  Translations = getConnection().getRepository(Translation)
  Words = getConnection().getRepository(Word)

  @Query(() => [Entry])
  async searchLatin(@Arg("search") search: string) {
    if (!search) throw new Error("empty search")
    if (!search.match(/^-?\w+$/)) throw new Error("invalid search")
    const entries = []
    const pushSuffix = async (suffix: string) => {
      if (search.match(new RegExp(suffix + "$"))) {
        const entry = await this.Entries.findOne({ word: "-" + suffix })
        if (entry) entries.push(entry)
        search = search.replace(new RegExp(suffix + "$"), "")
      }
    }
    await pushSuffix("que")
    await pushSuffix("ve")
    await pushSuffix("ne")
    const word = await this.Words.findOne({ word: search })
    if (word) entries.unshift(...word?.entries)
    return entries
      .filter((entry) => !!entry.translations?.length)
      .map((entry) => {
        if (
          [
            "noun",
            "verb",
            "adjective",
            "participle",
            "numeral",
            "suffix",
          ].includes(entry.partOfSpeech)
        ) {
          entry.identifiers = identifyWord(search, entry.forms, [], [])
        }
        return entry
      })
  }

  @Query(() => [Entry])
  async searchEnglish(@Arg("search") search: string) {
    if (!search) return []
    const translations = await this.Translations.find({
      where: { translation: Like(`%${search}%`) },
      relations: ["entry"],
    })
    const words = translations.map((t) => t.entry)
    words.forEach((word) => log.info(word.word))
    return words
  }

  @Query(() => [Entry])
  async searchLatinBrute(@Arg("search") search: string) {
    const macronSearch = getMacronOptionRegex(search)
    const fieldMatch = (field: string): string =>
      `"${field}" ~* '"${macronSearch}"'`
    const entries = await this.Entries.find({
      where: fieldMatch("principalParts") + " OR " + fieldMatch("forms"),
    })
    entries.forEach((entry) => log.info(entry.word))
    return entries.filter((entry) => !!entry.translations)
  }

  @Query(() => [Entry])
  async untranslated() {
    return await this.Entries.query(`SELECT * FROM untranslated`)
  }
}
