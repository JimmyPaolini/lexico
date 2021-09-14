-- @block find entry
SELECT id, "partOfSpeech", inflection, forms FROM entry
WHERE entry.id LIKE 'cano:%'

-- @block find word
SELECT word, "entryId" FROM word
JOIN word_entries_entry ON word = word_entries_entry."wordWord"
WHERE word LIKE 'iii'

-- @block find translation
SELECT * FROM translation
WHERE translation.translation ~* ''

-- @block find entry words
SELECT id, "partOfSpeech", inflection, forms, "wordWord" as word FROM entry
JOIN word_entries_entry ON entry.id = word_entries_entry."entryId"
WHERE entry.id LIKE 'mmix:%'

-- @block find entry translations
SELECT entry.id, "partOfSpeech", inflection, forms, translation FROM entry
JOIN translation ON entry.id = translation."entryId"
WHERE entry.id LIKE 'iii:%'

-- @block untranslated
SELECT * FROM entry
LEFT OUTER JOIN translation
ON (entry."id" = translation."entryId")
WHERE translation."entryId" IS NULL;

-- @block entries by partOfSpeech
SELECT * FROM entry WHERE "partOfSpeech"='determiner'