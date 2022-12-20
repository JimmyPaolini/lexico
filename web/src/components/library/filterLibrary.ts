import { Author, Book, Text } from 'src/graphql/generated'

export const filterLibrary = (
  authors: Author[],
  searched: string,
): Author[] => {
  if (!searched) return authors
  const re = new RegExp(searched, 'i')
  return authors
    .map((author) => filterAuthor(author))
    .filter((x) => x) as Author[]

  function filterAuthor(author: Author) {
    if (author.name.match(re)) return author
    if (author.books) {
      author.books = author.books
        ?.map((book) => filterBook(book))
        .filter((x) => x) as Book[]
    }
    author.texts = author.texts
      .map((text) => filterText(text))
      .filter((x) => x) as Text[]
    return author?.books?.length || author.texts.length ? author : null
  }

  function filterBook(book: Book) {
    if (book.title.match(re)) return book
    book.texts = book.texts
      .map((text) => filterText(text))
      .filter((x) => x) as Text[]
    return book.texts.length ? book : null
  }

  function filterText(text: Text) {
    return text.title.match(re) ? text : null
  }
}
