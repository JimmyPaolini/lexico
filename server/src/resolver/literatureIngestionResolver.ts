import { Logger } from "tslog"
import { Mutation, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Author from "../entity/literature/Author"
import Line from "../entity/literature/Line"
import Text from "../entity/literature/Text"
import ingestLibrary from "../ingestion/literature/ingestLibrary"
import ingestWorks from "../ingestion/literature/ingestLiterature"

const log = new Logger()

@Resolver(Text)
export default class LiteratureIngestionResolver {
  Authors = getConnection().getRepository(Author)
  Works = getConnection().getRepository(Text)
  Lines = getConnection().getRepository(Line)

  @Mutation(() => Boolean)
  async ingestLibrary() {
    await ingestLibrary()
    return true
  }

  @Mutation(() => Boolean)
  async ingestWorks() {
    await ingestWorks()
    return true
  }

  @Mutation(() => Boolean)
  async clearAuthors() {
    log.info("clearing authors")
    await this.Authors.query(`DELETE FROM author`)
    log.info("cleared authors")
    return true
  }

  @Mutation(() => Boolean)
  async clearWorks() {
    log.info("clearing works")
    await this.Lines.query(`DELETE FROM line`)
    await this.Works.query(`DELETE FROM work`)
    log.info("cleared works")
    return true
  }

  @Mutation(() => Boolean)
  async clearLiterature() {
    await this.clearWorks()
    await this.clearAuthors()
    return true
  }
}
