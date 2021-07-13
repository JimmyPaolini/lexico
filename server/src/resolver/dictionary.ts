import { performance } from "perf_hooks"
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql"
import { getConnection } from "typeorm"
import Entry from "../../../entity/dictionary/Entry"
import Translation from "../../../entity/dictionary/Translation"
import Word from "../../../entity/dictionary/Word"
import VerbForms from "../../../entity/dictionary/word/forms/VerbForms"
import identifyEntryWord from "../../../utils/identifiers"
import log from "../../../utils/log"
import { hasSuffix } from "../../../utils/string"
import { GetBookmarks } from "../auth/token"
import { camelCaseFuturePerfect } from "../utils/forms"
import { ResolverContext } from "../utils/ResolverContext"

@Resolver(Entry)
export default class DictionaryResolver {
  Entries = getConnection().getRepository(Entry)
  Translations = getConnection().getRepository(Translation)
  Words = getConnection().getRepository(Word)

  @Query(() => [Entry])
  @UseMiddleware(GetBookmarks)
  async searchLatin(
    @Arg("search") search: string,
    @Ctx() { bookmarks }: ResolverContext,
  ): Promise<Entry[]> {
    const t0 = performance.now()
    if (!search || !search.match(/^-?(\w| )+\.?$/)) return []
    // log.info("searchLatin request", { search })

    const getWord = async (search: string) =>
      await this.Words.createQueryBuilder("word")
        .leftJoinAndSelect("word.entries", "entries")
        .leftJoinAndSelect("entries.translations", "translations")
        .where("word.word = :search", { search })
        .limit(1)
        .getOne()

    search = search.toLowerCase()
    const pushSuffix = async (suffix: string) => {
      const [nonSuffixWord, suffixEntry] = await Promise.all([
        getWord(search.replace(new RegExp(suffix + "$", "i"), "")),
        this.Entries.findOne(`-${suffix}:0`),
      ])
      if (nonSuffixWord) entries.push(...nonSuffixWord.entries)
      entries.push(suffixEntry)
    }

    let entries = []
    const word = await getWord(search)
    if (word) entries.push(...word.entries)
    if (hasSuffix(search, "que")) await pushSuffix("que")
    else if (hasSuffix(search, "ve")) await pushSuffix("ve")
    else if (hasSuffix(search, "ne")) await pushSuffix("ne")

    entries = entries
      .filter((entry) => !!entry.translations?.length)
      .map((entry) => {
        entry = identifyEntryWord(search, entry)
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
      responseTime: performance.now() - t0,
      entries: entries.map(({ id }) => id),
    })
    return entries
  }

  @Query(() => [Entry])
  @UseMiddleware(GetBookmarks)
  async searchEnglish(
    @Arg("search") search: string,
    @Ctx() { bookmarks }: ResolverContext,
  ): Promise<Entry[]> {
    const t0 = performance.now()
    if (!search) return []
    // log.info("searchEnglish request", { search })
    const translations = await this.Translations.createQueryBuilder(
      "translation",
    )
      .where(`translation.translation ~* '(^| )${search}( |$)'`)
      .leftJoinAndSelect("translation.entry", "entry")
      .leftJoinAndSelect("entry.translations", "entryTranslations")
      .getMany()

    const entries = translations
      .map((t) => t.entry)
      .filter((entry) => entry.partOfSpeech !== "properNoun")
      .map((entry) => {
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
      responseTime: performance.now() - t0,
      entries: entries.map(({ id }) => id),
    })
    return entries
  }

  @Query(() => Entry)
  async entry(@Arg("id") id: string): Promise<Entry> {
    return await this.Entries.findOneOrFail(id)
  }

  @Query(() => [Entry])
  async entries(@Arg("ids", () => [String]) ids: string[]): Promise<Entry[]> {
    return await this.Entries.findByIds(ids)
  }
}
