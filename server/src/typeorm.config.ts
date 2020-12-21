import dotenv from "dotenv"
import "reflect-metadata"
import { createConnection, getConnection } from "typeorm"
import Entry from "./entity/Entry"
import Translation from "./entity/Translation"
import Word from "./entity/Word"

dotenv.config()
export default {
  name: "default",
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "lexico",
  charset: "utf8mb4",
  entities: [Entry, Translation, Word],
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

  async function createPartOfSpeechView(partOfSpeech: PartOfSpeech) {
    await getConnection().query(`CREATE OR REPLACE VIEW ${partOfSpeech} AS
    SELECT * FROM entry WHERE partOfSpeech="${partOfSpeech}"`)
  }

  await createPartOfSpeechView("noun")
  await createPartOfSpeechView("verb")
  await createPartOfSpeechView("adjective")
  await createPartOfSpeechView("adverb")

  await getConnection().query(`CREATE OR REPLACE VIEW part_of_speech_counts AS
  SELECT partOfSpeech, COUNT(DISTINCT(word)) as count FROM entry GROUP BY partOfSpeech`)

  await getConnection().query(`CREATE OR REPLACE VIEW letter_counts AS
  SELECT DISTINCT(LOWER(LEFT(word, 1))) as firstLetter, COUNT(DISTINCT(word)) as count FROM entry GROUP BY LOWER(LEFT(word, 1))`)
}
