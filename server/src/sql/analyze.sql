-- @block typeorm searchLatin
EXPLAIN ANALYZE SELECT
  "Word"."word" AS "Word_word",
  "Word_entries"."id" AS "Word_entries_id",
  "Word_entries"."partOfSpeech" AS "Word_entries_partOfSpeech",
  "Word_entries"."principalParts" AS "Word_entries_principalParts",
  "Word_entries"."inflection" AS "Word_entries_inflection",
  "Word_entries"."forms" AS "Word_entries_forms",
  "Word_entries"."pronunciation" AS "Word_entries_pronunciation",
  "Word_entries"."etymology" AS "Word_entries_etymology",
  "Word_entries_translations"."id" AS "Word_entries_translations_id",
  "Word_entries_translations"."translation" AS "Word_entries_translations_translation",
  "Word_entries_translations"."entryId" AS "Word_entries_translations_entryId"
FROM "word" "Word"
LEFT JOIN "word_entries_entry" "Word_Word_entries" ON "Word_Word_entries"."wordWord"="Word"."word"
LEFT JOIN "entry" "Word_entries" ON "Word_entries"."id"="Word_Word_entries"."entryId"
LEFT JOIN "translation" "Word_entries_translations" ON "Word_entries_translations"."entryId"="Word_entries"."id"
WHERE "Word"."word" IN ('amoenus')

-- @block queryBuilder searchLatin
EXPLAIN ANALYZE SELECT
  "word"."word" AS "word_word",
  "entries"."id" AS "entries_id",
  "entries"."partOfSpeech" AS "entries_partOfSpeech",
  "entries"."principalParts" AS "entries_principalParts",
  "entries"."inflection" AS "entries_inflection",
  "entries"."forms" AS "entries_forms",
  "entries"."pronunciation" AS "entries_pronunciation",
  "entries"."etymology" AS "entries_etymology",
  "translations"."id" AS "translations_id",
  "translations"."translation" AS "translations_translation",
  "translations"."entryId" AS "translations_entryId"
FROM "word" "word"
LEFT JOIN "word_entries_entry" "word_entries" ON "word_entries"."wordWord"="word"."word"
LEFT JOIN "entry" "entries" ON "entries"."id"="word_entries"."entryId"
LEFT JOIN "translation" "translations" ON "translations"."entryId"="entries"."id"
WHERE "word"."word" = 'amoenus'

-- @block custom searchLatin
EXPLAIN ANALYZE SELECT
  "word_entries"."wordWord" AS "word_word",
  "entries"."id" AS "entries_id",
  "entries"."partOfSpeech" AS "entries_partOfSpeech",
  "entries"."principalParts" AS "entries_principalParts",
  "entries"."inflection" AS "entries_inflection",
  "entries"."forms" AS "entries_forms",
  "entries"."pronunciation" AS "entries_pronunciation",
  "entries"."etymology" AS "entries_etymology",
  "translations"."id" AS "translations_id",
  "translations"."translation" AS "translations_translation",
  "translations"."entryId" AS "translations_entryId"
FROM "word_entries_entry" "word_entries"
LEFT JOIN "entry" "entries" ON "entries"."id"="word_entries"."entryId"
LEFT JOIN "translation" "translations" ON "translations"."entryId"="entries"."id"
WHERE "word_entries"."wordWord" = 'amoenus'