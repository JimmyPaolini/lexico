import { getConnection } from 'typeorm'

import hic from '../../../data/dictionary/hic.json'
import ille from '../../../data/dictionary/ille.json'
import omnis from '../../../data/dictionary/omnis.json'
import Entry from '../../../entity/dictionary/Entry'
import log from '../../../utils/log'
import { ingestEntryWords } from './ingestEntryWords'
import ingestPraenomenAbbreviations from './ingestPraenomenAbbreviations.ts'
import ingestRomanNumerals from './ingestRomanNumerals'

export default async function ingestManual(): Promise<void> {
  log.info('ingesting manuals')

  await deleteManual('qui:0')
  await deleteManual('quis:0')
  await deleteManual('latinitas:0')
  await deleteManual('ille:0')
  await deleteManual('ille:1')
  await deleteManual('omnis:0')

  await createManual(hic as Entry)
  await createManual(ille as Entry)
  await createManual(omnis as Entry)

  await ingestPraenomenAbbreviations()
  await ingestRomanNumerals()

  log.info('ingested manuals')
}

export async function createManual(manual: Entry): Promise<void> {
  const Entries = getConnection().getRepository(Entry)
  await deleteManual(manual.id)
  log.info(`creating ${manual.id}`)
  const entry = await Entries.save(manual, { reload: false })
  await ingestEntryWords(entry)
  // manual entries should not have translation references; they will not be ingested
  log.info(`created ${manual.id}`)
}

export async function deleteManual(id: string): Promise<void> {
  const Entries = getConnection().getRepository(Entry)
  log.info(`deleting ${id}`)
  await Entries.delete(id)
  log.info(`deleted ${id}`)
}

// If primary key gets out of sync, usually after a restore
// SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"translation"', 'id')), (SELECT (MAX("id") + 1) FROM "translation"), FALSE);
