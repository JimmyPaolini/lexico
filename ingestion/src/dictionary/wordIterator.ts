import fs from 'fs'

import Text from '../../../entity/literature/Text'
import DictionaryResolver from '../../../server/src/resolver/dictionary'
import { ResolverContext } from '../../../server/src/utils/ResolverContext'
import { connectDatabase } from '../../../utils/database'
import {
  getLineGeneratorByText,
  getWordGenerator,
} from '../literature/generator'

main()
async function main() {
  const connection = await connectDatabase()
  const Texts = connection.getRepository(Text)
  const dictionaryResolver = new DictionaryResolver()

  const id = 'caesar_de bello gallico_book 1'
  const text = await Texts.findOne(id)
  if (!text) return
  const lines = getLineGeneratorByText(text)
  const wordsWithNoResults = [] as string[]
  const entryCounts = {} as { [word: string]: number }
  let lineCount = 0

  for await (const line of lines) {
    const words = getWordGenerator(line.line)
    await Promise.all(
      Array.from(words).map(async (word) => {
        const entries = await dictionaryResolver.searchLatin(
          word,
          {} as ResolverContext,
        )
        if (!entries.length) wordsWithNoResults.push(word)
        else {
          for (const entry of entries) {
            if (!entryCounts[entry.id]) entryCounts[entry.id] = 1
            entryCounts[entry.id]++
          }
        }
      }),
    )
    lineCount++
  }
  fs.writeFileSync(
    `../data/dictionary/analysis/${id}.json`,
    JSON.stringify(
      {
        lineCount,
        wordsWithNoResultsNonCapitalized: wordsWithNoResults
          .filter((word) => !word.match(/^[A-Z]/))
          .sort((a, b) => entryCounts[b] - entryCounts[a]),
        entryCounts: Object.keys(entryCounts)
          .sort((a, b) => entryCounts[b] - entryCounts[a])
          .map((id) => ({ [id]: entryCounts[id] })),
        wordsWithNoResults,
      },
      null,
      2,
    ),
  )
}
