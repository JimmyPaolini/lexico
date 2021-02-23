import { ApolloServer } from "apollo-server-express"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  LOG_SQL,
  PORT,
} from "./config.json"
import Entry from "./entity/dictionary/Entry"
import Translation from "./entity/dictionary/Translation"
import Word from "./entity/dictionary/Word"
import Author from "./entity/literature/Author"
import Book from "./entity/literature/Book"
import Line from "./entity/literature/Line"
import Text from "./entity/literature/Text"
import User from "./entity/user/User"
import AuthenticationResolver from "./resolver/authentication"
import DatabaseResolver from "./resolver/database"
import DictionaryResolver from "./resolver/dictionary"
import DictionaryIngestionResolver from "./resolver/dictionaryIngestion"
import LiteratureResolver from "./resolver/literature"
import LiteratureIngestionResolver from "./resolver/literatureIngestion"
import UserResolver from "./resolver/user"
import { createDbViews } from "./utils/database"
import logger from "./utils/log"

const log = logger.getChildLogger()

async function main() {
  await createConnection({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [Entry, Translation, Word, Author, Book, Text, Line, User],
    logging: LOG_SQL || ["log", "info", "schema", "migration", "warn", "error"],
    maxQueryExecutionTime: 1000,
    synchronize: true,
  })
  log.info("Connected to database")
  await createDbViews()

  const app = express()
  const corsOptions = {
    credentials: true,
    origin: ["http://localhost:3000", "https://lexicolatin.com"],
  }
  app.use(cors(corsOptions))
  app.use(cookieParser())

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        DictionaryResolver,
        DictionaryIngestionResolver,
        LiteratureResolver,
        LiteratureIngestionResolver,
        DatabaseResolver,
        AuthenticationResolver,
        UserResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
  })
  server.applyMiddleware({ app, cors: corsOptions })

  app.listen(PORT, () => log.info(`Listening at http://localhost:${PORT}`))
}
main()
