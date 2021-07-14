-- @block scratch
SELECT * FROM entry LIMIT 10

-- @block find entry
SELECT id, "partOfSpeech", inflection, forms FROM entry
WHERE entry.id LIKE 'cano:%'

-- @block find entry words
SELECT id, "partOfSpeech", inflection, forms, "wordWord" as word
FROM entry
JOIN word_entries_entry
ON entry.id = word_entries_entry."entryId"
WHERE entry.id LIKE 'mmix:%'

-- @block find entry translations
SELECT entry.id, "partOfSpeech", inflection, forms, translation
FROM entry
JOIN translation
ON entry.id = translation."entryId"
WHERE entry.id LIKE 'iii:%'

-- @block find translation
SELECT *
FROM translation
WHERE translation.translation ~* 'fuck'

-- @block find word
SELECT word, "entryId" FROM word
JOIN word_entries_entry
ON word = word_entries_entry."wordWord"
WHERE word LIKE 'iii'

-- @block count
SELECT COUNT(*) FROM translation

-- @block find a partOfSpeech
SELECT * FROM entry WHERE "partOfSpeech"='determiner'

-- @block untranslated
SELECT * FROM entry
LEFT OUTER JOIN translation
ON (entry."id" = translation."entryId")
WHERE translation."entryId" IS NULL;


-- @block users
SELECT * FROM public.user

-- @block bookmarks
SELECT * FROM user_bookmarks_entry

-- @block show tables
SELECT * FROM pg_catalog.pg_tables

-- @block describe table
SELECT * FROM information_schema.columns WHERE table_name = 'user_bookmarks_entry'

-- @block describe constraints
SELECT * FROM pg_catalog.pg_constraint

-- @block partOfSpeech_counts
SELECT "partOfSpeech",
COUNT(DISTINCT(id)) as count,
COUNT(DISTINCT(id)) / (SELECT COUNT(*) FROM entry)::float * 100 as percent
FROM entry GROUP BY "partOfSpeech"

-- @block entry_letter_counts
SELECT LOWER(LEFT(id, 1)) as letter,
COUNT(DISTINCT(id)) as count,
COUNT(DISTINCT(id)) / (SELECT COUNT(*) FROM entry)::float * 100 as percent
FROM entry GROUP BY LOWER(LEFT(id, 1))

-- @block word_letter_counts
SELECT LOWER(LEFT(word, 1)) as letter,
COUNT(DISTINCT(word)) as count,
COUNT(DISTINCT(word)) / (SELECT COUNT(*) FROM word)::float * 100 as percent
FROM word GROUP BY LOWER(LEFT(word, 1))

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