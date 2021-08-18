import fs from "fs"
import Text from "../../../entity/literature/Text"
import DictionaryResolver from "../../../server/src/resolver/dictionary"
import { ResolverContext } from "../../../server/src/utils/ResolverContext"
import { connectDatabase } from "../../../utils/database"
import {
  getLineGeneratorByText,
  getWordGenerator,
} from "../literature/generator"

main()
async function main() {
  const connection = await connectDatabase()
  const Texts = connection.getRepository(Text)
  const dictionaryResolver = new DictionaryResolver()

  const text = await Texts.findOne("virgil_aeneid_book 1")
  if (!text) return
  const lines = getLineGeneratorByText(text)
  const wordsWithNoResults = [] as string[]
  const entryCounts = {} as { [word: string]: number }

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
  }
  fs.writeFileSync(
    JSON.stringify({
      entryCounts,
      wordsWithNoResults,
      wordsWithNoResultsNonCapitalized: wordsWithNoResults.filter(
        (word) => !word.match(/^[A-Z]/),
      ),
    }),
    "../../../data/dictionary/wordIteratorResult.json",
  )
}
