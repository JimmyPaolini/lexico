import { FindManyOptions, getConnection } from "typeorm"
import Entry from "../../../entity/dictionary/Entry"
import logger from "../../../utils/log"
import { ingestEntryWords } from "./ingestEntryWords"

const log = logger.getChildLogger()

export default async function ingestWords() {
  log.info("Ingesting Words")
  const Entries = getConnection().getRepository(Entry)
  const params = {
    order: { word: "ASC" },
    take: 100,
  } as FindManyOptions<Entry>
  let skip = 0
  let entries = await Entries.find({ ...params, skip })
  while (entries.length) {
    log.info("selected", entries.length, "from entry", skip, entries[0].word)
    for (const entry of entries) {
      await ingestEntryWords(entry)
    }
    skip += params.take as number
    entries = await Entries.find({ ...params, skip })
  }
  log.info("Ingested Words")
  return true
}
