import "reflect-metadata"
import { getConnection } from "typeorm"
import { PartOfSpeech } from "../entity/dictionary/word/PartOfSpeech"

export default async function createDbViews() {
  await getConnection().query(`
    CREATE OR REPLACE VIEW untranslated AS
    SELECT "word", "partOfSpeech", "principalParts", "inflection", "translation", "forms", "etymology", "pronunciation"
    FROM entry e
    LEFT OUTER JOIN translation t
    ON (e."id" = t."entryId")
    WHERE t."entryId" IS NULL;`)

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

  async function createCountsView(
    name: string,
    selector: string,
    table: string,
  ) {
    await getConnection().query(
      `CREATE OR REPLACE VIEW ${name}_counts AS ` +
        `SELECT ${selector}, ` +
        `COUNT(DISTINCT(word)) as count, ` +
        `COUNT(DISTINCT(word)) / (SELECT COUNT(*) FROM ${table}) * 100 as percent ` +
        `FROM ${table} GROUP BY ${selector}`,
    )
  }

  await createCountsView("part_of_speech", '"partOfSpeech"', "entry")
  await createCountsView("entry_letter", "LOWER(LEFT(word, 1))", "entry")
  await createCountsView("word_letter", "LOWER(LEFT(word, 1))", "word")
}
