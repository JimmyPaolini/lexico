import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql"
import { getConnection } from "typeorm"
import Entry from "../../../entity/dictionary/Entry"
import Translation from "../../../entity/dictionary/Translation"
import Word from "../../../entity/dictionary/Word"
import VerbForms from "../../../entity/dictionary/word/forms/VerbForms"
import log from "../../../utils/log"
import { hasSuffix } from "../../../utils/string"
import { GetBookmarks } from "../auth/authentication"
import { camelCaseFuturePerfect, identifyWord } from "../utils/forms"
import { ResolverContext } from "../utils/ResolverContext"

@Resolver(Entry)
export default class DictionaryResolver {
  Entries = getConnection().getRepository(Entry)
  Translations = getConnection().getRepository(Translation)
  Words = getConnection().getRepository(Word)
  identifiablePartsOfSpeech = [
    "noun",
    "properNoun",
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
    if (!search || !search.match(/^-?(\w| )+\.?$/)) return []
    log.info("searchLatin request", { search })

    search = search.toLowerCase()
    const pushSuffix = async (suffix: string) => {
      const nonSuffixWord = await this.Words.findOne({
        word: search.replace(new RegExp(suffix + "$", "i"), ""),
      })
      if (nonSuffixWord) entries.push(...nonSuffixWord.entries)
      const suffixEntry = await this.Entries.findOne(`-${suffix}:0`)
      entries.push(suffixEntry)
    }

    let entries = []
    const word = await this.Words.findOne(search)
    if (word) entries.push(...word.entries)
    if (hasSuffix(search, "que")) await pushSuffix("que")
    else if (hasSuffix(search, "ve")) await pushSuffix("ve")
    else if (hasSuffix(search, "ne")) await pushSuffix("ne")

    entries = entries
      .filter((entry) => !!entry.translations?.length)
      .map((entry) => {
        // entry.translations = entry.translations?.map((translation) => ({
        //   ...translation,
        //   translation: translation.translation.replace(/^(.*)\s/, ""),
        // }))
        if (this.identifiablePartsOfSpeech.includes(entry.partOfSpeech)) {
          let word = search
          if (hasSuffix(word, "que")) word = word.replace(/que$/i, "")
          else if (hasSuffix(word, "ve")) word = word.replace(/ve$/i, "")
          else if (hasSuffix(word, "ne")) word = word.replace(/ne$/i, "")
          entry.identifiers = identifyWord(word, entry.forms, [], [])
        }
        if (entry.partOfSpeech === "verb" && entry.forms) {
          entry.forms = camelCaseFuturePerfect(entry.forms as VerbForms)
        }
        entry.bookmarked = bookmarks?.some(
          (bookmark) => bookmark.id === entry.id,
        )
        return entry
      })
    log.info("searchLatin response", {
      search,
      entries: entries.map(({ id }) => id),
    })
    return entries
  }

  @Query(() => [Entry])
  @UseMiddleware(GetBookmarks)
  async searchEnglish(
    @Arg("search") search: string,
    @Ctx() { bookmarks }: ResolverContext,
  ) {
    if (!search) return []
    log.info("searchEnglish request", { search })
    const translations = await this.Translations.createQueryBuilder(
      "translation",
    )
      .innerJoinAndSelect("translation.entry", "entry")
      .where(`translation.translation ~* '(^| )${search}( |$)'`)
      .innerJoinAndSelect("entry.translations", "x")
      .getMany()

    const entries = translations
      .map((t) => t.entry)
      .filter((entry) => entry.partOfSpeech !== "properNoun")
      .map((entry) => {
        // entry.translations = entry.translations?.map((translation) => ({
        //   ...translation,
        //   translation: translation.translation.replace(/^([^)]*)\s/, ""),
        // }))
        if (entry.partOfSpeech === "verb" && entry.forms) {
          entry.forms = camelCaseFuturePerfect(entry.forms as VerbForms)
        }
        entry.bookmarked = bookmarks?.some(
          (bookmark) => bookmark.id === entry.id,
        )
        return entry
      })
    log.info("searchEnglish response", {
      search,
      entries: entries.map(({ id }) => id),
    })
    return entries
  }
}
