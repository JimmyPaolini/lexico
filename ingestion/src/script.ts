import { connectDatabase } from "../../utils/database"

async function main() {
  const connection = await connectDatabase()
  connection.query(
    `ANALYZE SELECT "Word"."word" AS "Word_word", "Word_entries"."id" AS "Word_entries_id", "Word_entries"."partOfSpeech" AS "Word_entries_partOfSpeech", "Word_entries"."principalParts" AS "Word_entries_principalParts", "Word_entries"."inflection" AS "Word_entries_inflection", "Word_entries"."forms" AS "Word_entries_forms", "Word_entries"."pronunciation" AS "Word_entries_pronunciation", "Word_entries"."etymology" AS "Word_entries_etymology", "Word_entries_translations"."id" AS "Word_entries_translations_id", "Word_entries_translations"."translation" AS "Word_entries_translations_translation", "Word_entries_translations"."entryId" AS "Word_entries_translations_entryId" FROM "word" "Word" ` +
      `LEFT JOIN "word_entries_entry" "Word_Word_entries" ON "Word_Word_entries"."wordWord"="Word"."word" LEFT JOIN "entry" "Word_entries" ON "Word_entries"."id"="Word_Word_entries"."entryId"  LEFT JOIN "translation" "Word_entries_translations" ON "Word_entries_translations"."entryId"="Word_entries"."id" ` +
      `WHERE "Word"."word" IN ($1) ["amoenus"]`,
  )
}
main()
