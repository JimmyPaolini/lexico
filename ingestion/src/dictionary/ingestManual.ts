import { getConnection } from "typeorm"
import hic from "../../../data/dictionary/hic.json"
import Entry from "../../../entity/dictionary/Entry"
import Translation from "../../../entity/dictionary/Translation"
import log from "../../../utils/log"
import { ingestEntryWords } from "./ingestEntryWords"

export default async function ingestManual() {
  const Entries = getConnection().getRepository(Entry)
  const Translations = getConnection().getRepository(Translation)
  Translations
  log.info("ingesting manuals")

  await deleteManual("qui:0")
  await deleteManual("quis:0")
  await deleteManual("latinitas:0")

  await createManual(hic as Entry)

  log.info("ingested manuals")

  async function createManual(manual: Entry) {
    log.info(`creating ${manual.id}`)
    await deleteManual(manual.id)
    const entry = await Entries.save(manual)
    await ingestEntryWords(entry) // manual entries should not have translation references; they will not be ingested
    log.info(`created ${manual.id}`)
  }

  async function deleteManual(id: string) {
    log.info(`deleting ${id}`)
    await Entries.delete(id)
    log.info(`deleted ${id}`)
  }
}
// If primary key gets out of sync, usually after a restore
// SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"translation"', 'id')), (SELECT (MAX("id") + 1) FROM "translation"), FALSE);
