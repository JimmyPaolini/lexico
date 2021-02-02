import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"
import session from "express-session"
import { buildContext } from "graphql-passport"
import passport from "passport"
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
  SESSION_SECRET,
} from "./config.json"
import Entry from "./entity/dictionary/Entry"
import Translation from "./entity/dictionary/Translation"
import Word from "./entity/dictionary/Word"
import Author from "./entity/literature/Author"
import Book from "./entity/literature/Book"
import Line from "./entity/literature/Line"
import Text from "./entity/literature/Text"
import User from "./entity/user/User"
import DictionaryResolver from "./resolver/dictionary"
import DictionaryIngestionResolver from "./resolver/dictionaryIngestion"
import LiteratureResolver from "./resolver/literature"
import LiteratureIngestionResolver from "./resolver/literatureIngestion"
import UserResolver from "./resolver/user"
import "./utils/authentication"
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
    synchronize: true,
  })
  log.info("Connected to database")
  // await createDbViews()

  const app = express()

  app.use(cors())
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        DictionaryResolver,
        DictionaryIngestionResolver,
        LiteratureResolver,
        LiteratureIngestionResolver,
        UserResolver,
      ],
    }),
    context: ({ req, res }) => buildContext({ req, res }),
  })

  app.get("/google", passport.authenticate("google", { scope: ["email"] }))

  app.get(
    "/google/callback",
    passport.authenticate("google", { successRedirect: "/graphql" }),
  )

  app.listen(PORT, () => log.info(`Listening at http://localhost:${PORT}`))
  server.applyMiddleware({ app })
}
main()
