import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql"
import { getConnection, Like } from "typeorm"
import Entry from "../../../entity/dictionary/Entry"
import Translation from "../../../entity/dictionary/Translation"
import Word from "../../../entity/dictionary/Word"
import log from "../../../utils/log"
import { getMacronOptionRegex } from "../../../utils/string"
import { GetBookmarks } from "../auth/authentication"
import { identifyWord } from "../utils/forms"
import { ResolverContext } from "../utils/ResolverContext"

@Resolver(Entry)
export default class DictionaryResolver {
  Entries = getConnection().getRepository(Entry)
  Translations = getConnection().getRepository(Translation)
  Words = getConnection().getRepository(Word)
  identifiablePartsOfSpeech = [
    "noun",
    "verb",
    "adjective",
    "adverb",
    "participle",
    "numeral",
    "suffix",
  ]

  @Query(() => [Entry])
  @UseMiddleware(GetBookmarks)
  async searchLatin(
    @Arg("search") search: string,
    @Ctx() { bookmarks }: ResolverContext,
  ) {
    log.info("searchLatin req:", { search })
    if (!search) throw new Error("empty search")
    if (!search.match(/^-?(\w| )+$/)) throw new Error("invalid search")
    const hasSuffix = (suffix: string) => search.match(new RegExp(suffix + "$"))
    const pushSuffix = async (suffix: string) => {
      const nonSuffixWord = await this.Words.findOne({
        word: search.replace(new RegExp(suffix + "$", "i"), ""),
      })
      if (nonSuffixWord) entries.push(...nonSuffixWord.entries)
      const suffixEntry = await this.Entries.findOne({
        id: `-${suffix}:0`,
      })
      entries.push(suffixEntry)
    }

    let entries = []
    const word = await this.Words.findOne({ word: search })
    if (word) entries.push(...word.entries)
    if (hasSuffix("que")) await pushSuffix("que")
    else if (hasSuffix("ve")) await pushSuffix("ve")
    else if (hasSuffix("ne")) await pushSuffix("ne")

    entries = entries
      .filter((entry) => !!entry.translations?.length)
      .map((entry) => {
        if (this.identifiablePartsOfSpeech.includes(entry.partOfSpeech)) {
          entry.identifiers = identifyWord(search, entry.forms, [], [])
        }
        entry.bookmarked = bookmarks?.some(
          (bookmark) => bookmark.id === entry.id,
        )
        return entry
      })
    log.info(
      "searchLatin res:",
      entries.map(({ id }) => ({ id })),
    )
    if (!!word && !entries.length) throw new Error("word has no entries")
    if (!entries.length) throw new Error("not found")
    return entries
  }

  @Query(() => [Entry])
  async searchEnglish(@Arg("search") search: string) {
    if (!search) return []
    log.info("searchEnglish req:", { search })
    const translations = await this.Translations.find({
      where: { translation: Like(`%${search}%`) },
      relations: ["entry"],
    })
    const entries = translations.map((t) => t.entry)
    log.info(
      "searchEnglish res:",
      entries.map(({ id }) => ({ id })),
    )
    if (!entries.length) throw new Error("not found")
    return entries
  }

  @Query(() => [Entry])
  async searchLatinBrute(@Arg("search") search: string) {
    const macronSearch = getMacronOptionRegex(search)
    const fieldMatch = (field: string): string =>
      `"${field}" ~* '"${macronSearch}"'`
    const entries = await this.Entries.find({
      where: fieldMatch("principalParts") + " OR " + fieldMatch("forms"),
    })
    entries.forEach((entry) => log.info(entry.id))
    return entries.filter((entry) => !!entry.translations)
  }

  @Query(() => [Entry])
  async untranslated() {
    return await this.Entries.query(`SELECT * FROM untranslated`)
  }

  @Query(() => Boolean)
  async script() {
    return true
  }
}
