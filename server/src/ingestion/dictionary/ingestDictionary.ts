import fs from "fs"
import path from "path"
import { Logger } from "tslog"
import { getFirstLetter } from "../../utils/string"
import ingestWord from "./ingestEntry"

export default async function ingestDictionary(
  firstLetter = "a",
  lastLetter = "z",
) {
  const log = new Logger()
  log.info(`READING HTML FILES`)
  const files = getHtmlFiles(firstLetter, lastLetter)
  log.info(`STARTING INGESTION`)
  // const t0 = performance.now()
  for (let fileName of files) {
    await ingestWord(fileName.replace(/\.json$/, ""))
  }
  // const runtimeInMinutes = (performance.now() - t0) / 1000 / 60
  // log.info(`FINISHED INGESTION`, runtimeInMinutes, "minutes")
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
