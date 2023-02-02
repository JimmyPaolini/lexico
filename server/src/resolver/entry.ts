import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { In } from 'typeorm'

import Entry from '../entity/dictionary/Entry'
import { DevOnly } from '../services/authorization/environment'
import { processEntry } from '../services/entry'
import { Log } from '../services/log'

@Resolver(Entry)
export class EntryResolver {
  @Query(() => Entry)
  @Log({ mapResult: ({ id }) => id })
  async entry(@Arg('id') id: string): Promise<Entry> {
    const entry = await Entry.findOneOrFail({ where: { id } })
    if (!entry.translations?.length) throw Error(`entry "${id}" not found`)
    return processEntry(entry)
  }

  @Query(() => [Entry])
  @Log({ mapResult: (entries: Entry[]) => entries.map(({ id }) => id) })
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

  @Mutation(() => Entry)
  @UseMiddleware(DevOnly)
  async upsertEntry(@Arg('entry') entry: Entry): Promise<Entry> {
    return await Entry.save(entry)
  }

  @Mutation(() => Entry)
  @UseMiddleware(DevOnly)
  async deleteEntry(@Arg('entry') entry: Entry): Promise<Entry> {
    await Entry.delete(entry.id)
    return entry
  }
}
