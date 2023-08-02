import fs from 'fs-extra'

import { clearLiterature } from '../utils/clear'
import ingestAuthor from './ingestAuthor'

export default async function ingestLiterature(): Promise<void> {
  await clearLiterature()
  const authors = fs.readdirSync('../data/literature')
  for (const nickname of authors) {
    await ingestAuthor(nickname)
  }
}
