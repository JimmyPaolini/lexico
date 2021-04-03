import { getConnection } from "typeorm"
import { PartOfSpeech } from "../../../entity/dictionary/word/PartOfSpeech"

export async function createDbViews() {
  await getConnection().query(`
    CREATE OR REPLACE VIEW untranslated AS
    SELECT entry."id", "partOfSpeech", "principalParts", "inflection", "translation", "forms", "etymology", "pronunciation"
    FROM entry
    LEFT OUTER JOIN translation
    ON (entry."id" = translation."entryId")
    WHERE translation."entryId" IS NULL;`)

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
  await createCountView("line")

  async function createPartOfSpeechView(partOfSpeech: PartOfSpeech) {
    await getConnection().query(`CREATE OR REPLACE VIEW ${partOfSpeech} AS
    SELECT * FROM entry WHERE "partOfSpeech"='${partOfSpeech}'`)
  }

  await createPartOfSpeechView("noun")
  await createPartOfSpeechView("verb")
  await createPartOfSpeechView("adjective")
  await createPartOfSpeechView("adverb")

  await getConnection().query(
    `CREATE OR REPLACE VIEW part_of_speech_counts AS ` +
      `SELECT "partOfSpeech", ` +
      `COUNT(DISTINCT(id)) as count, ` +
      `COUNT(DISTINCT(id)) / (SELECT COUNT(*) FROM entry)::float * 100 as percent ` +
      `FROM entry GROUP BY "partOfSpeech"`,
  )

  await getConnection().query(
    `CREATE OR REPLACE VIEW entry_letter_counts AS ` +
      `SELECT LOWER(LEFT(id, 1)) as letter, ` +
      `COUNT(DISTINCT(id)) as count, ` +
      `COUNT(DISTINCT(id)) / (SELECT COUNT(*) FROM entry)::float * 100 as percent ` +
      `FROM entry GROUP BY LOWER(LEFT(id, 1))`,
  )

  await getConnection().query(
    `CREATE OR REPLACE VIEW word_letter_counts AS ` +
      `SELECT LOWER(LEFT(word, 1)) as letter, ` +
      `COUNT(DISTINCT(word)) as count, ` +
      `COUNT(DISTINCT(word)) / (SELECT COUNT(*) FROM word)::float * 100 as percent ` +
      `FROM word GROUP BY LOWER(LEFT(word, 1))`,
  )
}
