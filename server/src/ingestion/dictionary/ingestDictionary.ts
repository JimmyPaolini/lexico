import fs from "fs"
import path from "path"
import logger from "../../utils/log"
import { getFirstLetter } from "../../utils/string"
import ingestWord from "./ingestEntry"

export default async function ingestDictionary(
  firstLetter = "a",
  lastLetter = "z",
) {
  const log = logger.getChildLogger()
  log.info(`READING HTML FILES`)
  const files = getHtmlFiles(firstLetter, lastLetter)
  log.info(`STARTING INGESTION`)
  for (let fileName of files) {
    await ingestWord(fileName.replace(/\.json$/, ""))
  }
  log.info(`FINISHED INGESTION`)
}

function getHtmlFiles(firstLetter: string, lastLetter: string): string[] {
  const files = fs.readdirSync(
    path.join(process.cwd(), `./data/wiktionary/lemma`),
  )
  files.filter(
    (fileName) =>
      getFirstLetter(fileName) >= firstLetter &&
      getFirstLetter(fileName) <= lastLetter,
  )
  files.sort((a, b) => getFirstLetter(a).localeCompare(getFirstLetter(b)))
  return files
}
