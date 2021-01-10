import "reflect-metadata"
import { createConnection, getConnection } from "typeorm"
import Entry from "./entity/dictionary/Entry"
import Translation from "./entity/dictionary/Translation"
import Word from "./entity/dictionary/Word"
import { PartOfSpeech } from "./entity/dictionary/word/PartOfSpeech"
import Author from "./entity/literature/Author"
import Book from "./entity/literature/Book"
import Line from "./entity/literature/Line"
import Text from "./entity/literature/Text"

export default {
  name: "default",
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "lexico",
  charset: "utf8mb4",
  entities: [Entry, Translation, Word, Author, Book, Text, Line],
  logging: ["log", "info", "schema", "migration", "warn", "error"],
  synchronize: true,
} as Parameters<typeof createConnection>[0]

export async function createViews() {
  await getConnection().query(`
    CREATE OR REPLACE VIEW untranslated AS
    SELECT word, partOfSpeech, principalParts, inflection, translation, forms, etymology, pronunciation
    FROM entry e
    LEFT OUTER JOIN translation t
    ON (e.id = t.entryId)
    WHERE t.entryId IS NULL;`)

  async function createCountView(tableName: string) {
    await getConnection().query(`CREATE OR REPLACE VIEW ${tableName}_count AS
    SELECT count(*) FROM ${tableName}`)
  }

  await createCountView("entry")
  await createCountView("word")
  await createCountView("translation")
  await createCountView("author")
  await createCountView("book")
  await createCountView("text")

  async function createPartOfSpeechView(partOfSpeech: PartOfSpeech) {
    await getConnection().query(`CREATE OR REPLACE VIEW ${partOfSpeech} AS
    SELECT * FROM entry WHERE partOfSpeech="${partOfSpeech}"`)
  }

  await createPartOfSpeechView("noun")
  await createPartOfSpeechView("verb")
  await createPartOfSpeechView("adjective")
  await createPartOfSpeechView("adverb")

  await getConnection().query(
    `CREATE OR REPLACE VIEW part_of_speech_counts AS ` +
      `SELECT partOfSpeech, ` +
      `COUNT(DISTINCT(word)) as count, ` +
      `COUNT(DISTINCT(word)) / (SELECT COUNT(*) FROM entry) * 100 as percent ` +
      `FROM entry GROUP BY partOfSpeech`,
  )

  await getConnection().query(
    `CREATE OR REPLACE VIEW entry_letter_counts AS ` +
      `SELECT LOWER(LEFT(word, 1)) as letter, ` +
      `COUNT(DISTINCT(word)) as count, ` +
      `COUNT(DISTINCT(word)) / (SELECT COUNT(*) FROM entry) * 100 as percent ` +
      `FROM entry GROUP BY LOWER(LEFT(word, 1))`,
  )

  await getConnection().query(
    `CREATE OR REPLACE VIEW word_letter_counts AS ` +
      `SELECT LOWER(LEFT(word, 1)) as letter, ` +
      `COUNT(DISTINCT(word)) as count, ` +
      `COUNT(DISTINCT(word)) / (SELECT COUNT(*) FROM word) * 100 as percent ` +
      `FROM word GROUP BY LOWER(LEFT(word, 1))`,
  )
}
