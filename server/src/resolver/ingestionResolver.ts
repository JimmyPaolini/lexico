import { Logger } from "tslog"
import { Arg, Mutation, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Entry from "../entity/Entry"
import Word from "../entity/Word"
import ingestDictionary from "../ingestion/dictionary/ingestDictionary"
import ingestWord from "../ingestion/dictionary/ingestWord"
import ingestWiktionary, {
  categories,
} from "../ingestion/wiktionary/ingestWiktionary"

const log = new Logger()

@Resolver()
export default class IngestionResolver {
  entryRepository = getConnection().getRepository(Entry)
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
    if ([firstLetter, lastLetter].includes("-")) {
      const regex = `REGEXP_LIKE(word, "^\\-", "i")`
      await this.entryRepository.query(`DELETE FROM \`entry\` WHERE ${regex}`)
      await this.wordRepository.query(`DELETE FROM \`word\` WHERE ${regex}`)
      firstLetter = "a"
    }
    validateLetters([firstLetter, lastLetter])
    try {
      log.info("Clearing database")
      const regex = `REGEXP_LIKE(word, "^[${firstLetter}-${lastLetter}]", "i")`
      await this.entryRepository.query(`DELETE FROM \`entry\` WHERE ${regex}`)
      await this.wordRepository.query(`DELETE FROM \`word\` WHERE ${regex}`)
      log.info("Cleared database")
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
