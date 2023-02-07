import { Mutation, Resolver, UseMiddleware } from 'type-graphql'

import Entry from '../entity/dictionary/Entry'
import { DevOnly } from '../services/authorization/environment'
import ingestEntries from '../services/ingestion/dictionary/ingestEntries'
import ingestTranslationReferences from '../services/ingestion/dictionary/ingestTranslationReferences'
import ingestWords from '../services/ingestion/dictionary/ingestWords'
import ingestBible from '../services/ingestion/library/ingestBible'
import ingestLiterature from '../services/ingestion/library/ingestLiterature'
import ingestWiktionary from '../services/ingestion/wiktionary/ingestWiktionary'
import { Log } from '../services/log'

@Resolver(Entry)
export class IngestionResolver {
  @Mutation(() => Boolean, { nullable: true })
  @Log({ mapResult: ({ id }) => id })
  @UseMiddleware(DevOnly)
  async ingestEntries(): Promise<void> {
    await ingestEntries()
  }

  @Mutation(() => Boolean, { nullable: true })
  @Log({ mapResult: ({ id }) => id })
  @UseMiddleware(DevOnly)
  async ingestWiktionary(): Promise<void> {
    await ingestWiktionary()
  }

  @Mutation(() => Boolean, { nullable: true })
  @Log({ mapResult: ({ id }) => id })
  @UseMiddleware(DevOnly)
  async ingestWords(): Promise<void> {
    await ingestWords()
  }

  @Mutation(() => Boolean, { nullable: true })
  @Log({ mapResult: ({ id }) => id })
  @UseMiddleware(DevOnly)
  async ingestTranslationReferences(): Promise<void> {
    await ingestTranslationReferences()
  }

  @Mutation(() => Boolean, { nullable: true })
  @Log({ mapResult: ({ id }) => id })
  @UseMiddleware(DevOnly)
  async ingestDictionary(): Promise<void> {
    await ingestEntries()
    await Promise.all([ingestTranslationReferences(), ingestWords()])
  }

  @Mutation(() => Boolean, { nullable: true })
  @Log({ mapResult: ({ id }) => id })
  @UseMiddleware(DevOnly)
  async ingestLiterature(): Promise<void> {
    await ingestLiterature()
  }

  @Mutation(() => Boolean, { nullable: true })
  @Log({ mapResult: ({ id }) => id })
  @UseMiddleware(DevOnly)
  async ingestBible(): Promise<void> {
    await Promise.all([
      ingestBible('https://vulgate.org/', 'https://vulgate.org/'),
      ingestBible(
        'https://vulgate.org/nt/gospel/',
        'https://vulgate.org/nt/gospel/matthew_1.htm'
      ),
    ])
  }
}
