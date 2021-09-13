import { Typography } from "@material-ui/core"
import { GetStaticProps } from "next"
import Head from "next/head"
import React, { useEffect, useMemo, useState } from "react"
import CardDeck from "../components/accessories/CardDeck"
import SearchBarLayout from "../components/layout/SearchBarLayout"
import CustomLiteratureCard from "../components/literature/custom/CustomLiteratureCard"
import filterLiterature from "../components/literature/filterLiterature"
import LiteratureCard from "../components/literature/LiteratureCard"
import { Author, useGetAuthorsQuery } from "../graphql/generated"

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
  const { getAuthors: authors } = await useGetAuthorsQuery.fetcher()()
  return { props: { authors } }
}
