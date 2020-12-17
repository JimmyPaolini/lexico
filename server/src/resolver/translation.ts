import { Logger } from "tslog"
import { Arg, Query, Resolver } from "type-graphql"
import { getConnection, Like } from "typeorm"
import Translation from "../entity/Translation"
import Word from "../entity/Word"

const log = new Logger()

@Resolver(Translation)
export default class TranslationResolver {
  translationRepository = getConnection().getRepository(Translation)

  @Query(() => [Word])
  async english(@Arg("search") search: string) {
    const translations = await this.translationRepository.find({
      relations: ["word"],
      where: { text: Like(`%${search}%`) },
    })
    const words = translations.map((t) => t.word)
    log.info(words)
    return words
  }
}
