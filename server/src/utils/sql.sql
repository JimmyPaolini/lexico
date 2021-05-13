-- @block scratch
ALTER TABLE public."user" DROP COLUMN "passwordResetToken"

-- @block find entry
SELECT id, "partOfSpeech", inflection, forms FROM entry
WHERE entry.id LIKE 'iii:%'

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


-- @block show_tables
SELECT * FROM pg_catalog.pg_tables

-- @block resync translation primary key
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"translation"', 'id')), (SELECT (MAX("id") + 1) FROM "translation"), FALSE);


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