import { createConnection } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Translation from "../entity/dictionary/Translation"
import Word from "../entity/dictionary/Word"
import Author from "../entity/literature/Author"
import Book from "../entity/literature/Book"
import Line from "../entity/literature/Line"
import Text from "../entity/literature/Text"
import User from "../entity/user/User"
import { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } from "../utils/env"
import log, { DatabaseLogger } from "./log"

export async function connectDatabase() {
  await createConnection({
    type: "postgres",
    host: process.env.NODE_ENV === "production" ? "database" : "localhost",
    port: 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [Entry, Translation, Word, Author, Book, Text, Line, User],
    logger: new DatabaseLogger(),
    maxQueryExecutionTime: 1000,
    synchronize: true,
  })
  log.info("connected to database")
}
