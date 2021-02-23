import fs from "fs"
import path from "path"
import { getFirstLetter } from "../../utils/string"
import ingestEntries from "./ingestEntry"

export default async function ingestDictionary(
  firstLetter = "a",
  lastLetter = "z",
) {
  const files = getHtmlFiles(firstLetter, lastLetter)
  for (let fileName of files) {
    await ingestEntries(fileName.replace(/\.json$/, ""))
  }
}

function getHtmlFiles(firstLetter: string, lastLetter: string): string[] {
  const files = fs.readdirSync(path.join(process.cwd(), `./data/wiktionary`))
  files.filter(
    (fileName) =>
      getFirstLetter(fileName) >= firstLetter &&
      getFirstLetter(fileName) <= lastLetter,
  )
  files.sort((a, b) => getFirstLetter(a).localeCompare(getFirstLetter(b)))
  return files
}
