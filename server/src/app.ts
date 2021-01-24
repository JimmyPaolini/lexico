import { ApolloServer } from "apollo-server-express"
import dotenv from "dotenv"
import express from "express"
import "reflect-metadata"
import { Logger } from "tslog"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"
import Entry from "./entity/dictionary/Entry"
import Translation from "./entity/dictionary/Translation"
import Word from "./entity/dictionary/Word"
import Author from "./entity/literature/Author"
import Book from "./entity/literature/Book"
import Line from "./entity/literature/Line"
import Text from "./entity/literature/Text"
import DictionaryIngestionResolver from "./resolver/dictionaryIngestionResolver"
import DictionaryResolver from "./resolver/dictionaryResolver"
import LiteratureIngestionResolver from "./resolver/literatureIngestionResolver"
import LiteratureResolver from "./resolver/literatureResolver"
import createDbViews from "./utils/createDbViews"

const log = new Logger()

async function main() {
  dotenv.config()
  const DB_PORT = parseInt(process.env.DB_PORT || "")
  const PORT = parseInt(process.env.PORT || "")
  const logSQL = false

  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "lexico",
    entities: [Entry, Translation, Word, Author, Book, Text, Line],
    logging: logSQL || ["log", "info", "schema", "migration", "warn", "error"],
    synchronize: true,
  })
  log.info("Connected to database")
  await createDbViews()

  const app = express()
  app.listen(PORT, () =>
    log.info(`Listening at http://localhost:${process.env.PORT}`),
  )

  const api = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        DictionaryResolver,
        DictionaryIngestionResolver,
        LiteratureResolver,
        LiteratureIngestionResolver,
      ],
    }),
  })
  api.applyMiddleware({ app })
}
main()
