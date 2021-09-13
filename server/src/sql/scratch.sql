-- @block scratch
SELECT
  "Text"."id" AS "Text_id",
  "Text"."title" AS "Text_title",
  "Text"."authorId" AS "Text_authorId",
  "Text"."bookId" AS "Text_bookId",
  "Text_author"."id" AS "Text_author_id",
  "Text_author"."name" AS "Text_author_name",
  "Text_book"."id" AS "Text_book_id",
  "Text_book"."title" AS "Text_book_title",
  "Text_book"."authorId" AS "Text_book_authorId",
  "Text_book_author"."id" AS "Text_book_author_id",
  "Text_book_author"."name" AS "Text_book_author_name"
FROM "text" "Text"
LEFT JOIN "author" "Text_author" ON "Text_author"."id"="Text"."authorId"
LEFT JOIN "book" "Text_book" ON "Text_book"."id"="Text"."bookId"
LEFT JOIN "author" "Text_book_author" ON "Text_book_author"."id"="Text_book"."authorId"
ORDER BY "Text"."title" ASC
