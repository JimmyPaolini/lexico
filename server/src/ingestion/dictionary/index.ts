import fs from "fs"
import path from "path"
import { Logger } from "tslog"
import { getFirstLetter } from "../../utils/getFirstLetter"
import ingestHtml from "./ingestHtml"

const log = new Logger()
const pj = (key: string) => path.join(process.cwd(), key)

export default async function main(firstLetter = "a", lastLetter = "z") {
  log.info(`READING HTML FILES`)
  const files = getHtmlFiles(firstLetter, lastLetter)
  log.info(`STARTING INGESTION`)
  for (let fileName of files) {
    const data = require(pj(`./data/wiktionary/lemma/${fileName}`))
    await ingestHtml(data)
  }
  log.info(`FINISHED INGESTION`)
}

function getHtmlFiles(firstLetter: string, lastLetter: string): string[] {
  return fs
    .readdirSync(pj(`./data/wiktionary/lemma`))
    .filter(
      (fileName) =>
        getFirstLetter(fileName) >= firstLetter &&
        getFirstLetter(fileName) <= lastLetter &&
        !fileName.slice(0, -5).match(/\s|\.|-/g),
    )
    .sort((a, b) => getFirstLetter(a).localeCompare(getFirstLetter(b)))
}
