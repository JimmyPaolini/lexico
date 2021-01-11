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

  await createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ""),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "lexico",
    charset: "utf8mb4",
    entities: [Entry, Translation, Word, Author, Book, Text, Line],
    logging: ["log", "info", "schema", "migration", "warn", "error"],
    synchronize: true,
  })
  await createDbViews()

  const app = express()
  app.listen(parseInt(process.env.PORT || ""), () =>
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
