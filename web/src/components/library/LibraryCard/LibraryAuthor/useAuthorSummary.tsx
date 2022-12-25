import { Author } from 'src/graphql/generated'
import { sentenceCase } from 'src/utils/string'

export const useAuthorSummary = (author: Author) => {
  let authorSummary = [
    ...(author.books || []),
    ...author.texts.filter(
      (text) =>
        !(author.books || []).some((book) =>
          book.texts.some((bookText) => bookText.id === text.id)
        )
    ),
  ]
    .sort()
    .map((item) => sentenceCase(item.title).replace(/^\d+ /, ''))
    .join(' • ')
  if (author.id === 'catullus') authorSummary = 'Carmina 1-116'

  return authorSummary
}
