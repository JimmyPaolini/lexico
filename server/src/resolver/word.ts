import { Logger } from "tslog"
import { Arg, Query, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Word from "../entity/Word"

const log = new Logger()

@Resolver(Word)
export default class WordResolver {
  wordRepository = getConnection().getRepository(Word)

  @Query(() => [Word])
  async latin(@Arg("search") search: string) {
    const words = await this.wordRepository.find({ word: search })
    log.info(words)
    return words
  }
}
