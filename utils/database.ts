import { createConnection } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Translation from "../entity/dictionary/Translation"
import Word from "../entity/dictionary/Word"
import Author from "../entity/literature/Author"
import Book from "../entity/literature/Book"
import Line from "../entity/literature/Line"
import Text from "../entity/literature/Text"
import User from "../entity/user/User"
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  LOG_SQL,
} from "../utils/env"
import log from "./log"

export async function connectDatabase() {
  await createConnection({
    type: "postgres",
    host: process.env.NODE_ENV === "production" ? DB_HOST : "localhost",
    port: parseInt(DB_PORT!),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [Entry, Translation, Word, Author, Book, Text, Line, User],
    logging: LOG_SQL === "true" || [
      "log",
      "info",
      "schema",
      "migration",
      "warn",
      "error",
    ],
    maxQueryExecutionTime: 1000,
    synchronize: true,
  })
  log.info("connected to database")
}
