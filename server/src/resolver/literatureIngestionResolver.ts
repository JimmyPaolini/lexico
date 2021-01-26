import { Mutation, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Author from "../entity/literature/Author"
import Line from "../entity/literature/Line"
import Text from "../entity/literature/Text"
import ingestLibrary from "../ingestion/literature/ingestLibrary"
import ingestLiterature from "../ingestion/literature/ingestLiterature"
import { backupDatabase } from "../utils/database"
import logger from "../utils/log"

const log = logger.getChildLogger()

@Resolver(Text)
export default class LiteratureIngestionResolver {
  Authors = getConnection().getRepository(Author)
  Texts = getConnection().getRepository(Text)
  Lines = getConnection().getRepository(Line)

  @Mutation(() => Boolean)
  async ingestLibrary() {
    await ingestLibrary()
    return true
  }

  @Mutation(() => Boolean)
  async ingestWorks() {
    await ingestLiterature()
    await backupDatabase("literature-ingestion")
    return true
  }

  @Mutation(() => Boolean)
  async clearAuthors() {
    log.info("clearing authors")
    await this.Authors.createQueryBuilder().delete().execute()
    log.info("cleared authors")
    return true
  }

  @Mutation(() => Boolean)
  async clearTexts() {
    log.info("clearing texts")
    await this.Lines.createQueryBuilder().delete().execute()
    await this.Texts.createQueryBuilder().delete().execute()
    log.info("cleared texts")
    return true
  }

  @Mutation(() => Boolean)
  async clearLiterature() {
    await this.clearTexts()
    await this.clearAuthors()
    return true
  }
}
