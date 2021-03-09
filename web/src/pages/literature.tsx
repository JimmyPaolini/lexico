import { Grid } from "@material-ui/core"
import { GetStaticProps } from "next"
import React, { useEffect, useMemo, useState } from "react"
import Author from "../../../entity/literature/Author"
import Book from "../../../entity/literature/Book"
import Text from "../../../entity/literature/Text"
import CardDeck from "../components/accessories/CardDeck"
import AuthorCard from "../components/literature/LiteratureCard"
import SearchBar from "../components/search/SearchBar"
import useGetAuthors from "../hooks/literature/useGetAuthors"
import { queryClient } from "./_app"

export default function Literature() {
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)
  useEffect(() => {
    if (!search) setSearched("")
  }, [search])

  const { data: authors, isLoading, isError } = useGetAuthors()

  const cards = useMemo(() => {
    const authorsCopy = JSON.parse(JSON.stringify(authors || []))
    return filterLiterature(authorsCopy, searched).map((author) => ({
      key: author.name,
      Card: () => <AuthorCard {...{ author, searched }} />,
    }))
  }, [authors, searched])

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <SearchBar
          {...{
            search,
            setSearch,
            isLoading,
            handleSearchExecute: () => setSearched(search),
            target: "literature",
          }}
        />
      </Grid>
      <Grid item container justify="center">
        {isLoading ? null : isError ? (
          <div>no literature</div>
        ) : (
          <CardDeck cards={cards} />
        )}
      </Grid>
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  await queryClient.prefetchQuery("getAuthors")
  return { props: {} }
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
