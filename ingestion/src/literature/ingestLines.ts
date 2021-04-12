import fs from "fs-extra"
import { getConnection } from "typeorm"
import Line from "../../../entity/literature/Line"
import Text from "../../../entity/literature/Text"
import log from "../../../utils/log"
import { romanToDecimal } from "../../../web/src/utils/romanNumeral"

export default async function ingestLines(text: Text) {
  const Lines = getConnection().getRepository(Line)
  const author = text.author.id
  const book = text.book ? text.book.title + "/" : ""
  log.info(`Ingesting ${author}/${book}${text.title}`)
  const lines = fs
    .readFileSync(`../data/literature/${author}/${book}${text.title}.txt`)
    .toString() as string
  if (!lines.includes("\n")) log.info("NO LINES")
  const areLinesLabelled = lines.split("\n").some((line) => line.match(/^#\S+/))
  await Lines.save(
    lines.split("\n").map((line, lineNumber) => {
      let lineLabel = areLinesLabelled ? "•" : "" + (lineNumber + 1)
      if (line.match(/^#\S+/)) {
        lineLabel = line.match(/^#\S+/)![0]!.slice(1)
        if (lineLabel.match(/[IVXLCDM]+/))
          lineLabel = "" + romanToDecimal(lineLabel)
        line = line.replace(/^#\S+ ?/, "")
      }
      return { line, lineNumber, lineLabel, text } as Line
    }),
  )
}
