import { getConnection } from "typeorm"
import Author from "../../entity/literature/Author"
import Line from "../../entity/literature/Line"
import Work from "../../entity/literature/Work"

export default async function ingestLines(
  $: cheerio.Root,
  work: Work,
  author: Author,
) {
  const Lines = getConnection().getRepository(Line)
  const text = getText($)
  await Promise.all(
    text.split("\n").map(async (text, lineNumber) => {
      await Lines.insert({ text, lineNumber, work, author })
    }),
  )
}

function getText($: cheerio.Root): string {
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
