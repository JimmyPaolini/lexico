import { Mutation, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Author from "../entity/literature/Author"
import Book from "../entity/literature/Book"
import Line from "../entity/literature/Line"
import Text from "../entity/literature/Text"
import ingestLibrary from "../ingestion/literature/ingestLibrary"
import ingestLiterature from "../ingestion/literature/ingestLiterature"
import logger from "../utils/log"

const log = logger.getChildLogger()

@Resolver(Text)
export default class LiteratureIngestionResolver {
  Authors = getConnection().getRepository(Author)
  Books = getConnection().getRepository(Book)
  Texts = getConnection().getRepository(Text)
  Lines = getConnection().getRepository(Line)

  @Mutation(() => Boolean)
  async ingestLibrary() {
    log.info("ingesting library")
    await ingestLibrary()
    log.info("ingesting library")
    return true
  }

  @Mutation(() => Boolean)
  async ingestLiterature() {
    log.info("ingesting literature")
    await ingestLiterature()
    log.info("ingested literature")
    // await backupDatabase("literature-ingestion")
    return true
  }

  @Mutation(() => Boolean)
  async clearLiterature() {
    log.info("clearing literature")
    await this.Lines.createQueryBuilder().delete().execute()
    await this.Texts.createQueryBuilder().delete().execute()
    await this.Books.createQueryBuilder().delete().execute()
    await this.Authors.createQueryBuilder().delete().execute()
    log.info("cleared literature")
    return true
  }
}
