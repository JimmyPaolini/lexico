import fs from "fs"
import path from "path"
import { Logger } from "tslog"
import { getFirstLetter } from "../../utils/string"
import ingestWord from "./ingestWord"

const log = new Logger()

export default async function ingest(firstLetter = "a", lastLetter = "z") {
  log.info(`READING HTML FILES`)
  const files = getHtmlFiles(firstLetter, lastLetter)
  log.info(`STARTING INGESTION`)
  for (let fileName of files) {
    await ingestWord(fileName.replace(/\.json$/gi, ""))
  }
  log.info(`FINISHED INGESTION`)
}

function getHtmlFiles(firstLetter: string, lastLetter: string): string[] {
  return fs
    .readdirSync(path.join(process.cwd(), `./data/wiktionary/lemma`))
    .filter(
      (fileName) =>
        getFirstLetter(fileName) >= firstLetter &&
        getFirstLetter(fileName) <= lastLetter &&
        !fileName.slice(0, -5).match(/\s|\.|-/g),
    )
    .sort((a, b) => getFirstLetter(a).localeCompare(getFirstLetter(b)))
}
