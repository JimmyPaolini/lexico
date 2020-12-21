import { Logger } from "tslog"
import { Arg, Query, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Entry from "../entity/Entry"
import Word from "../entity/Word"

const log = new Logger()

@Resolver(Entry)
export default class EntryResolver {
  Words = getConnection().getRepository(Word)
  Entries = getConnection().getRepository(Entry)

  @Query(() => [Entry])
  async searchLatin(@Arg("search") search: string) {
    if (!search) return []
    const word = await this.Words.findOne({ word: search })
    log.info("search latin", word)
    return word?.entries
  }

  @Query(() => [Entry])
  async searchLatinBrute(@Arg("search") search: string) {
    const macronSearch = macronOptionize(search)
    const fieldMatch = (field: string): string =>
      `REGEXP_LIKE(${field}, '"${macronSearch}"', "i")`
    const words = await this.Entries.find({
      where: fieldMatch("principalParts") + " OR " + fieldMatch("forms"),
    })
    words.forEach((word) => log.info(word.word))
    return words
  }
}

function macronOptionize(str: string) {
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
