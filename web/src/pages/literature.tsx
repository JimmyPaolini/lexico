import { Typography } from "@material-ui/core"
import { GetStaticProps } from "next"
import React, { useEffect, useMemo, useState } from "react"
import Author from "../../../entity/literature/Author"
import Book from "../../../entity/literature/Book"
import Text from "../../../entity/literature/Text"
import CardDeck from "../components/accessories/CardDeck"
import LiteratureCard from "../components/literature/LiteratureCard"
import SearchBarLayout from "../components/SearchBar/SearchBarLayout"
import { getAuthors } from "../hooks/literature/useGetAuthors"

interface Props {
  authors: Author[]
}
export default function Literature({ authors }: Props) {
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)
  useEffect(() => {
    if (!search) setSearched("")
  }, [search])

  const cards = useMemo(() => {
    const authorsCopy = JSON.parse(JSON.stringify(authors || []))
    return filterLiterature(authorsCopy, searched).map((author) => ({
      key: author.name,
      Card: () => <LiteratureCard {...{ author, searched }} />,
    }))
  }, [authors, searched])

  return (
    <SearchBarLayout
      searchBarProps={{
        search,
        setSearch,
        isLoading: false,
        handleSearchExecute: () => setSearched(search),
        target: "literature",
      }}
    >
      {!cards.length ? (
        <Typography variant="h4">No Results</Typography>
      ) : (
        <CardDeck cards={cards} />
      )}
    </SearchBarLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const authors = await getAuthors()
  return { props: { authors } }
}

function filterLiterature(authors: Author[], searched: string) {
  if (!searched) return authors
  const re = new RegExp(searched, "i")
  return authors
    .map((author) => filterAuthor(author))
    .filter((x) => x) as Author[]

  function filterAuthor(author: Author) {
    if (author.name.match(re)) return author
    if (author.books)
      author.books = author.books
        ?.map((book) => filterBook(book))
        .filter((x) => x) as Book[]
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
