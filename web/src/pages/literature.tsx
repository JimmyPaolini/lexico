import { Typography } from "@material-ui/core"
import { GetStaticProps } from "next"
import Head from "next/head"
import React, { useEffect, useMemo, useState } from "react"
import Author from "../../../entity/literature/Author"
import Book from "../../../entity/literature/Book"
import Text from "../../../entity/literature/Text"
import CardDeck from "../components/accessories/CardDeck"
import SearchBarLayout from "../components/layout/SearchBarLayout"
import CustomLiteratureCard from "../components/literature/custom/CustomLiteratureCard"
import LiteratureCard from "../components/literature/LiteratureCard"
import { getAuthors } from "../hooks/literature/useGetAuthors"

interface LiteratureProps {
  authors: Author[]
}
export default function Literature({ authors }: LiteratureProps): JSX.Element {
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)
  useEffect(() => {
    if (!search) setSearched("")
  }, [search])

  const handleSearchExecute = () => setSearched(search)

  const authorsCopy = JSON.parse(JSON.stringify(authors))
  const cards = useMemo(
    () =>
      filterLiterature(authorsCopy, searched).map((author) => {
        const Card = <LiteratureCard {...{ author }} />
        return { key: author.name, Card }
      }),
    [searched],
  )
  if (cards[0].key !== "custom")
    cards.unshift({ key: "custom", Card: <CustomLiteratureCard /> })

  return (
    <>
      <Head>
        <title>Lexico - Literature</title>
        <meta
          name="description"
          content="Read and translate Latin literature from authors like Caesar and Virgil, or input your own Latin text"
        />
        <meta
          name="keywords"
          content={`Latin, Literature, Read, English, Translation, ${authors
            .map((author) => author.name)
            .join(", ")}`}
        />
      </Head>
      <SearchBarLayout
        searchBarProps={{
          search,
          setSearch,
          isLoading: false,
          handleSearchExecute,
          target: "literature",
        }}>
        {!cards.length ? (
          <Typography variant="h4">No Results</Typography>
        ) : (
          <CardDeck cards={cards} />
        )}
      </SearchBarLayout>
    </>
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
