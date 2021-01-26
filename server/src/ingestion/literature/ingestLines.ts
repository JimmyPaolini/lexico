import fs from "fs-extra"
import { getConnection } from "typeorm"
import Author from "../../entity/literature/Author"
import Line from "../../entity/literature/Line"
import Text from "../../entity/literature/Text"

export default async function ingestLines(
  $: cheerio.Root,
  text: Text,
  author: Author,
) {
  const Lines = getConnection().getRepository(Line)
  const lines = getLines($)
  // await Promise.all(
  //   lines.split("\n").map(async (line, lineNumber) => {
  //     await Lines.insert({ line, lineNumber, text, author })
  //   }),
  // )
  Lines
  text
  const fileName = `data/literature/${author.nickname}/${text.title}.txt`
  fs.ensureFileSync(fileName)
  fs.writeFileSync(fileName, lines)
}

function getLines($: cheerio.Root): string {
  const text = $("p")
    .text()
    .replace(/undefined/g, "")
    .replace(/[\[\]]+ ?/g, "")
    .replace(/(\s)(\s+)/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim()
  if (!text.length) throw new Error(`no text`)
  return text
}
