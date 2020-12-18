import { Logger } from "tslog"
import { Arg, Mutation, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Word from "../entity/Word"
import ingestDictionary from "../ingestion/dictionary/ingest"
import ingestWord from "../ingestion/dictionary/ingestWord"
import ingestWiktionary, { categories } from "../ingestion/wiktionary/ingest"

const log = new Logger()

@Resolver()
export default class IngestionResolver {
  wordRepository = getConnection().getRepository(Word)

  @Mutation(() => Boolean)
  async ingestDictionary(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    validateLetters([firstLetter, lastLetter])
    try {
      await ingestDictionary(firstLetter, lastLetter)
      return true
    } catch (e) {
      log.error(e.toString())
      return false
    }
  }

  @Mutation(() => Boolean)
  async ingestWord(@Arg("word") word: string) {
    try {
      await ingestWord(word)
      return true
    } catch (e) {
      log.error(e.toString())
      return false
    }
  }

  @Mutation(() => Boolean)
  async clearDictionary(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    validateLetters([firstLetter, lastLetter])
    try {
      log.info("Clearing database")
      const regex = `REGEXP_LIKE(word, "^[${firstLetter}-${lastLetter}]", "i")`
      await this.wordRepository.query(`DELETE FROM \`word\` WHERE ${regex}`)
      return true
    } catch (e) {
      log.error(e.toString())
      return false
    }
  }

  @Mutation(() => Boolean)
  async ingestWiktionary(
    @Arg("category") category: string,
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    if (!categories[category]) throw new Error("unknown category")
    validateLetters([firstLetter, lastLetter])
    try {
      await ingestWiktionary(category, firstLetter, lastLetter)
      return true
    } catch (e) {
      log.error(e.toString())
      return false
    }
  }
}

function validateLetters(letters: string[]): void {
  for (const letter of letters) {
    if (!letter.match(/[a-z]/i)) throw new Error("invalid letter")
  }
}
