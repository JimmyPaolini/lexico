-- @block count
SELECT COUNT(*) FROM translation

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
