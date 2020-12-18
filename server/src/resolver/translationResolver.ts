import { Logger } from "tslog"
import { Arg, Query, Resolver } from "type-graphql"
import { getConnection, Like } from "typeorm"
import Entry from "../entity/Entry"
import Translation from "../entity/Translation"

const log = new Logger()

@Resolver(Translation)
export default class TranslationResolver {
  translationRepository = getConnection().getRepository(Translation)

  @Query(() => [Entry])
  async english(@Arg("search") search: string) {
    const translations = await this.translationRepository.find({
      relations: ["word"],
      where: { text: Like(`%${search}%`) },
    })
    const words = translations.map((t) => t.entry)
    log.info(words)
    return words
  }
}
