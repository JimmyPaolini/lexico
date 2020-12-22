import { Logger } from "tslog"
import { Query, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Work from "../entity/literature/Work"
import ingestAuthors from "../ingestion/literature/ingestLiterature"

const log = new Logger()

@Resolver(Work)
export default class LiteratureIngestionResolver {
  Works = getConnection().getRepository(Work)

  @Query(() => Boolean)
  async ingestWorks() {
    log.info("going")
    await ingestAuthors()
    return true
  }
}
