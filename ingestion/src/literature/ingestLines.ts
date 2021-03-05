import fs from "fs-extra"
import { getConnection } from "typeorm"
import Line from "../../../entity/literature/Line"
import Text from "../../../entity/literature/Text"

export default async function ingestLines(text: Text) {
  const Lines = getConnection().getRepository(Line)
  const author = text.author.name
  const book = text.book ? text.book.title + "/" : ""
  log.info(`Ingesting ${author}/${book}${text.title}`)
  const lines = fs
    .readFileSync(`data/literature/${author}/${book}${text.title}.txt`)
    .toString() as string
  if (!lines.includes("\n")) log.info("NO LINES")
  await Promise.all(
    lines
      .split("\n")
      .map(
        async (line, lineNumber) =>
          await Lines.save({ line, lineNumber, text }),
      ),
  )
}
