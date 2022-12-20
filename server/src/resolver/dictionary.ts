import { performance } from 'perf_hooks'
import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { In } from 'typeorm'

import identifyEntryWord from '../../../utils/identifiers'
import log from '../../../utils/log'
import { hasSuffix } from '../../../utils/string'
import { GetBookmarks } from '../authentication/middleware'
import Entry from '../entity/dictionary/Entry'
import Translation from '../entity/dictionary/Translation'
import Word from '../entity/dictionary/Word'
import VerbForms from '../entity/dictionary/word/forms/VerbForms'
import { ResolverContext } from '../utils/ResolverContext'
import { Database } from '../utils/database'
import { camelCaseFuturePerfect } from '../utils/forms'

@Resolver(Entry)
export class DictionaryResolver {
  @Query(() => [Entry])
  @UseMiddleware(GetBookmarks)
  async search(
    @Arg('search') search: string,
    @Ctx() context: ResolverContext,
  ): Promise<Entry[]> {
    const t0 = performance.now()

    const [latinEntries, englishEntries] = await Promise.all([
      this.searchLatin(search, context),
      this.searchEnglish(search, context),
    ])
    const entries = [
      ...latinEntries,
      ...englishEntries.filter(
        (englishEntry) =>
          !latinEntries.some((latinEntry) => latinEntry.id !== englishEntry.id),
      ),
    ]

    log.info('search', {
      search,
      responseTime: performance.now() - t0,
      entries: entries.map(({ id }) => id),
    })

    return entries
  }

  @Query(() => [Entry])
  @UseMiddleware(GetBookmarks)
  async searchLatin(
    @Arg('search') search: string,
    @Ctx() { bookmarks }: ResolverContext,
  ): Promise<Entry[]> {
    const t0 = performance.now()
    if (!search?.match(/^-?(\w| )+\.?$/)) return []

    search = search.toLowerCase().trim()

    const word = await Word.findOne({ where: { word: search } })
    const entries = word?.entries ?? []
    entries.concat(await this.searchSuffixes(search))

    const entriesProcessed = entries
      .filter((entry) => !!entry.translations?.length)
      .map((entry) => {
        entry = identifyEntryWord(search, entry)
        if (entry.partOfSpeech === 'verb' && entry.forms) {
          entry.forms = camelCaseFuturePerfect(entry.forms as VerbForms)
        }
        entry.bookmarked = bookmarks?.some(
          (bookmark) => bookmark.id === entry.id,
        )
        entry.isLatinSearchResult = true
        return entry
      })

    log.info('searchLatin', {
      search,
      responseTime: performance.now() - t0,
      entries: entriesProcessed.map(({ id }) => id),
    })

    return entriesProcessed
  }

  async searchSuffix(search: string, suffix: string): Promise<Entry[]> {
    if (!hasSuffix(search, suffix)) return []
    const [nonSuffixWord, suffixEntry] = await Promise.all([
      Word.findOne({
        where: { word: search.replace(new RegExp(suffix + '$', 'i'), '') },
      }),
      Entry.findOne({ where: { id: `-${suffix}:0` } }),
    ])
    return [
      ...(nonSuffixWord ? nonSuffixWord.entries : []),
      ...(suffixEntry ? [suffixEntry] : []),
    ]
  }

  async searchSuffixes(search: string): Promise<Entry[]> {
    return (
      await Promise.all([
        this.searchSuffix(search, 'que'),
        this.searchSuffix(search, 've'),
        this.searchSuffix(search, 'ne'),
      ])
    ).flat()
  }

  @Query(() => [Entry])
  @UseMiddleware(GetBookmarks)
  async searchEnglish(
    @Arg('search') search: string,
    @Ctx() { bookmarks }: ResolverContext,
  ): Promise<Entry[]> {
    const t0 = performance.now()
    if (!search) return []
    search = search.trim()

    const translations = await Database.getRepository(Translation)
      .createQueryBuilder('translation')
      .where(`translation.translation ~* '(^| )${search}( |$)'`)
      .leftJoinAndSelect('translation.entry', 'entry')
      .leftJoinAndSelect('entry.translations', 'entryTranslations')
      .getMany()

    const entries = translations
      .map((t) => t.entry)
      .filter((entry) => entry.partOfSpeech !== 'properNoun')
      .map((entry) => {
        if (entry.partOfSpeech === 'verb' && entry.forms) {
          entry.forms = camelCaseFuturePerfect(entry.forms as VerbForms)
        }
        entry.bookmarked = bookmarks?.some(
          (bookmark) => bookmark.id === entry.id,
        )
        entry.isLatinSearchResult = false
        return entry
      })
      .filter(
        (entry, index, self) =>
          index === self.findIndex((duplicate) => duplicate.id === entry.id),
      )

    log.info('searchEnglish', {
      search,
      responseTime: performance.now() - t0,
      entries: entries.map(({ id }) => id),
    })

    return entries
  }

  @Query(() => Entry)
  async entry(@Arg('id') id: string): Promise<Entry> {
    return await Entry.findOneOrFail({ where: { id } })
  }

  @Query(() => [Entry])
  async entries(@Arg('ids', () => [String]) ids: string[]): Promise<Entry[]> {
    return await Entry.find({ where: { id: In(ids) }, order: { id: 'ASC' } })
  }
}
