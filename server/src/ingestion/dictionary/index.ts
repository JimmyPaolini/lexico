import fs from "fs"
import path from "path"
import ingestHtml from "./ingestHtml"

main(process.argv[2], process.argv[3])
export default async function main(
  firstLetter: string = "a",
  lastLetter: string = "z",
) {
  console.log(`${new Date().toLocaleString()} - READING HTML FILES`)
  const files = getHtmlFiles(firstLetter, lastLetter)
  console.log(`${new Date().toLocaleString()} - STARTING INGESTION`)
  for (let fileName of files) {
    const html = require(path.join(process.cwd(), `../data/html/${fileName}`))
    ingestHtml(html)
  }
  console.log(`${new Date().toLocaleString()} - FINISHED INGESTION`)
}

function getHtmlFiles(
  firstLetter: string = "a",
  lastLetter: string = "z",
): string[] {
  let files = fs.readdirSync(path.join(process.cwd(), `./data/html`))
  files = files.filter(
    (fileName) =>
      getFirstLetter(fileName) >= firstLetter &&
      getFirstLetter(fileName) <= lastLetter,
  )
  files = files.filter((fileName) => !fileName.slice(0, -5).match(/\s|\.|-/g))
  files.sort((a, b) => getFirstLetter(a).localeCompare(getFirstLetter(b)))
  return files
}

function getFirstLetter(word: string) {
  const [l1, l2] = [...word.toLowerCase()]
  if (!l1.match(/[a-z-]/) && !l1.match(/[a-z-]/)) return "*"
  if (l1 === "-") return l2
  else return l1
}
