import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { In } from 'typeorm'

import identifyEntryWord from '../../../utils/identifiers'
import { hasSuffix } from '../../../utils/string'
import { ResolverContext } from '../config/ResolverContext'
import { Database } from '../config/database'
import Entry from '../entity/dictionary/Entry'
import Translation from '../entity/dictionary/Translation'
import Word from '../entity/dictionary/Word'
import VerbForms from '../entity/dictionary/word/forms/VerbForms'
import { GetBookmarks } from '../services/authentication/middleware'
import {
  camelCaseFuturePerfect,
  determinerFormsToAdjectiveForms,
  isDeterminerForms,
} from '../services/forms'
import { Log } from '../services/log'

@Resolver(Entry)
export class DictionaryResolver {
  @Query(() => [Entry])
  @UseMiddleware(GetBookmarks)
  @Log({
    mapParams: (params) => [params[0]],
    mapResult: (entries: Entry[]) => entries.map(({ id }) => id),
  })
  async search(
    @Arg('search') search: string,
    @Ctx() context: ResolverContext
  ): Promise<Entry[]> {
    const [latinEntries, englishEntries] = await Promise.all([
      this.searchLatin(search, context),
      this.searchEnglish(search, context),
    ])
    const entries = [
      ...latinEntries,
      ...englishEntries.filter(
        (englishEntry) =>
          !latinEntries.some((latinEntry) => latinEntry.id !== englishEntry.id)
      ),
    ]

    return entries
  }

  @Query(() => [Entry])
  @UseMiddleware(GetBookmarks)
  async searchLatin(
    @Arg('search') search: string,
    @Ctx() { bookmarks }: ResolverContext
  ): Promise<Entry[]> {
    if (!search?.match(/^-?(\w| )+\.?$/)) return []

    search = search.toLowerCase().trim()

    const word = await Word.findOne({ where: { word: search } })
    const entries = word?.entries ?? []
    entries.concat(await this.searchSuffixes(search))

    const entriesProcessed = entries
      .filter((entry) => !!entry.translations?.length)
      .map((entry) => {
        entry = identifyEntryWord(search, entry)
        entry.bookmarked = bookmarks?.some(
          (bookmark) => bookmark.id === entry.id
        )
        return processEntry(entry)
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
    @Ctx() { bookmarks }: ResolverContext
  ): Promise<Entry[]> {
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
        entry.bookmarked = bookmarks?.some(
          (bookmark) => bookmark.id === entry.id
        )
        entry.isLatinSearchResult = false
        return processEntry(entry)
      })
      .filter(
        (entry, index, self) =>
          index === self.findIndex((duplicate) => duplicate.id === entry.id)
      )

    return entries
  }

  @Query(() => Entry)
  @Log({ mapResult: ({ id }) => id })
  async entry(@Arg('id') id: string): Promise<Entry> {
    const entry = await Entry.findOneOrFail({ where: { id } })
    if (!entry.translations?.length) throw Error(`entry "${id}" not found`)
    return processEntry(entry)
  }

  @Query(() => [Entry])
  @Log({
    mapResult: (entries: Entry[]) => entries.map(({ id }) => id),
  })
  async entries(@Arg('ids', () => [String]) ids: string[]): Promise<Entry[]> {
    const entries = await Entry.find({
      where: { id: In(ids) },
      order: { id: 'ASC' },
    })
    const entriesProcessed = entries
      .filter((entry) => !!entry.translations?.length)
      .map(processEntry)

    return entriesProcessed
  }
}

function processEntry(entry: Entry) {
  if (entry.partOfSpeech === 'verb' && entry.forms) {
    entry.forms = camelCaseFuturePerfect(entry.forms as VerbForms)
  }
  if (
    ['pronoun', 'determiner'].includes(entry.partOfSpeech) &&
    isDeterminerForms(entry.forms)
  ) {
    entry.forms = determinerFormsToAdjectiveForms(entry.forms)
  }
  return entry
}
