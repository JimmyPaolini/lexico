import fs from 'fs'
import path from 'path'

import { getFirstLetter } from '../../../utils/string'
import ingestEntryWord from './ingestEntry'

export default async function ingestEntries(): Promise<void> {
  const files = getHtmlFiles()
  for (const fileName of files) {
    await ingestEntryWord(fileName.replace(/\.json$/, ''))
  }
}

function getHtmlFiles(): string[] {
  const files = fs.readdirSync(path.join(process.cwd(), '../data/wiktionary'))
  files.sort((a, b) => getFirstLetter(a).localeCompare(getFirstLetter(b)))
  return files
}
