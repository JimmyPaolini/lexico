import { Logger } from "tslog"
import { Arg, Mutation, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Word from "../entity/Word"
import ingestAll from "../ingestion/dictionary/index"
import ingestWord from "../ingestion/dictionary/ingestWord"

const log = new Logger()

@Resolver()
export default class IngestionResolver {
  wordRepository = getConnection().getRepository(Word)

  @Mutation(() => Boolean)
  async ingest(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    validateLetters([firstLetter, lastLetter])
    try {
      await ingestAll(firstLetter, lastLetter)
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
  async clear(
    @Arg("firstLetter") firstLetter: string,
    @Arg("lastLetter") lastLetter: string,
  ) {
    validateLetters([firstLetter, lastLetter])
    try {
      log.info("Clearing database")
      const regex = `REGEXP_LIKE(word, "^[${firstLetter}-${lastLetter}]", "i")`
      await this.wordRepository
        .createQueryBuilder()
        .delete()
        .from(Word)
        .where(regex)
        .execute()
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
