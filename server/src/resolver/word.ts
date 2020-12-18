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
    const macronSearch = macronOptionize(search)
    const words = await this.wordRepository.find({
      where: `REGEXP_LIKE(forms, '"${macronSearch}"', "i")`,
    })
    words.forEach((word) => log.info(word.word))
    return words
  }
}

function macronOptionize(str: string) {
  return str
    .replace(/a/g, "(a|ā)")
    .replace(/A/g, "(A|Ā)")
    .replace(/e/g, "(e|ē)")
    .replace(/E/g, "(E|Ē)")
    .replace(/i/g, "(i|ī)")
    .replace(/I/g, "(I|Ī)")
    .replace(/o/g, "(o|ō)")
    .replace(/O/g, "(O|Ō)")
    .replace(/u/g, "(u|ū)")
    .replace(/U/g, "(U|Ū)")
    .replace(/y/g, "(y|ȳ)")
    .replace(/Y/g, "(Y|Ȳ)")
}
