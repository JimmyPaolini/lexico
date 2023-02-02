import fs from 'fs'

import { ResolverContext } from '../../../config/ResolverContext'
import Text from '../../../entity/library/Text'
import { DictionaryResolver } from '../../../resolver/dictionary'
import {
  getLineGeneratorByText,
  getWordGenerator,
} from '../library/generator'

void main()
async function main() {
  const dictionaryResolver = new DictionaryResolver()

  const id = 'caesar_de bello gallico_book 1'
  const text = await Text.findOneBy({ id })
  if (!text) return
  const lines = getLineGeneratorByText(text)
  const wordsWithNoResults = [] as string[]
  const entryCounts = {} as Record<string, number>
  let lineCount = 0

  for await (const line of lines) {
    const words = getWordGenerator(line.line)
    await Promise.all(
      Array.from(words).map(async (word) => {
        const entries = await dictionaryResolver.searchLatin(
          word,
          {} as ResolverContext
        )
        if (!entries.length) wordsWithNoResults.push(word)
        else {
          for (const entry of entries) {
            if (!entryCounts[entry.id]) entryCounts[entry.id] = 1
            entryCounts[entry.id]++
          }
        }
      })
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
      2
    )
  )
}
