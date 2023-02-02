import fs from 'fs-extra'


import ingestAuthor from './ingestAuthor'

export default async function ingestLiterature(): Promise<void> {

  const authors = fs.readdirSync('../data/literature')
  for (const nickname of authors) {
    await ingestAuthor(nickname)
  }
}
