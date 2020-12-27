import { Logger } from "tslog"
import { Arg, Query, Resolver } from "type-graphql"
import { getConnection, Like } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Translation from "../entity/dictionary/Translation"
import Word from "../entity/dictionary/Word"
import { identifyWord } from "../utils/forms"

const log = new Logger()

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
    for (const entry of entries) {
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
    }
    return entries.filter((entry) => !!entry.translations?.length)
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
      `REGEXP_LIKE(${field}, '"${macronSearch}"', "i")`
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

function getMacronOptionRegex(str: string) {
  return str
    .replace(/a/g, "(a|ā)")
    .replace(/A/g, "(A|Ā)")
    .replace(/e/g, "(e|ē)")
    .replace(/E/g, "(E|Ē)")
    .replace(/i/g, "(i|ī)")
    .replace(/I/g, "(I|Ī)")
    .replace(/o/g, "(o|ō)")
    .replace(/O/g, "(O|Ō)")
    .replace(/u/g, "(u|ū)")
    .replace(/U/g, "(U|Ū)")
    .replace(/y/g, "(y|ȳ)")
    .replace(/Y/g, "(Y|Ȳ)")
}
