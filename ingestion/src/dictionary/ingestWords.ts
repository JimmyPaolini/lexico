import { FindManyOptions, getConnection } from 'typeorm'

import Entry from '../../../server/src/entity/dictionary/Entry'
import log from '../../../utils/log'
import { ingestEntryWords } from './ingestEntryWords'

export default async function ingestWords(): Promise<void> {
  log.info('Ingesting Words')
  const Entries = getConnection().getRepository(Entry)
  const params = {
    order: { word: 'ASC' },
    take: 100,
  } as FindManyOptions<Entry>
  let skip = 0
  let entries = await Entries.find({ ...params, skip })
  while (entries.length) {
    log.info(`selected ${entries.length} from entry ${skip} ${entries[0].id}`)
    for (const entry of entries) {
      await ingestEntryWords(entry)
    }
    skip += params.take as number
    entries = await Entries.find({ ...params, skip })
  }
  log.info('Ingested Words')
}
