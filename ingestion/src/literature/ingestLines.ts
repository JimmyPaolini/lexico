import fs from 'fs-extra'
import { getConnection } from 'typeorm'

import Line from '../../../entity/literature/Line'
import Text from '../../../entity/literature/Text'
import log from '../../../utils/log'
import { romanToDecimal } from '../../../web/src/utils/romanNumeral'

export default async function ingestLines(text: Text): Promise<void> {
  const Lines = getConnection().getRepository(Line)
  const author = text.author.id
  const book = text.book ? text.book.title + '/' : ''
  log.info(`Ingesting ${author}/${book}${text.title}`)
  const lines = fs
    .readFileSync(`../data/literature/${author}/${book}${text.title}.txt`)
    .toString() as string
  if (!lines.includes('\n')) log.info('NO LINES')

  // Line labels must start with a #hashtag
  // and they can't contain white space, this is a design decision
  const areLinesLabelled = lines.split('\n').some((line) => line.match(/^#\S+/))
  await Lines.save(
    lines.split('\n').map((line, lineNumber) => {
      let lineLabel = areLinesLabelled ? '•' : '' + (lineNumber + 1)
      const lineLabelHashtag = line.match(/^#\S+/)
      if (lineLabelHashtag) {
        lineLabel = lineLabelHashtag[0].slice(1)
        if (lineLabel.match(/[IVXLCDM]+/))
          lineLabel = '' + romanToDecimal(lineLabel)
        line = line.replace(/^#\S+ ?/, '')
      }
      const id = text.id + '_' + lineNumber
      return { id, line, lineNumber, lineLabel, text } as Line
    }),
  )
}
