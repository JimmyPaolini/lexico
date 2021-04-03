import fs from "fs-extra"
import { getConnection } from "typeorm"
import Line from "../../../entity/literature/Line"
import Text from "../../../entity/literature/Text"
import log from "../../../utils/log"
import { romanToDecimal } from "../../../web/src/utils/romanNumeral"

export default async function ingestLines(text: Text) {
  const Lines = getConnection().getRepository(Line)
  const author = text.author.name
  const book = text.book ? text.book.title + "/" : ""
  log.info(`Ingesting ${author}/${book}${text.title}`)
  const lines = fs
    .readFileSync(`data/literature/${author}/${book}${text.title}.txt`)
    .toString() as string
  if (!lines.includes("\n")) log.info("NO LINES")
  const areLinesLabelled = lines
    .split("\n")
    .some((line) => line.match(/(^\[\d+\])|(^[IVXLCDM]+\.)/))
  await Promise.all(
    lines.split("\n").map(async (line, lineNumber) => {
      let lineLabel = areLinesLabelled ? "•" : "" + (lineNumber + 1)
      if (line.match(/^\[\d+\]/)) {
        lineLabel = line.match(/^\[\d+\]/)![0]!.match(/\d+/)![0]
        line = line.replace(/^\[\d+\] ?/, "")
      }
      if (line.match(/^[IVXLCDM]+\./)) {
        const label = line.match(/^[IVXLCDM]+\./)![0]!.match(/[IVXLCDM]+/)![0]
        lineLabel = "" + romanToDecimal(label)
        line = line.replace(/^[IVXLCDM]+\. ?/, "")
      }
      return await Lines.save({ line, lineNumber, lineLabel, text })
    }),
  )
}
