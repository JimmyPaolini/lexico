import React, { useEffect, useMemo, useState } from 'react'

import { Typography } from '@mui/material'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import { Deck } from '../components/layout/Deck'
import SearchBarLayout from '../components/layout/SearchBarLayout'
import LiteratureCard from '../components/literature/LiteratureCard'
import CustomLiteratureCard from '../components/literature/custom/CustomLiteratureCard'
import filterLiterature from '../components/literature/filterLiterature'
import { Author, useGetAuthorsQuery } from '../graphql/generated'

type Props = {
  authors: Author[]
}

export default function Literature({ authors }: Props) {
  const [search, setSearch] = useState<string>('')
  const [searched, setSearched] = useState<string>(search)
  useEffect(() => {
    if (!search) setSearched('')
  }, [search])

  const handleSearchExecute = () => setSearched(search)

  const authorsCopy = JSON.parse(JSON.stringify(authors))
  const cards = useMemo(
    () => [
      <CustomLiteratureCard />,
      ...filterLiterature(authorsCopy, searched).map((author) => {
        return <LiteratureCard {...{ author }} />
      }),
    ],
    [searched],
  )

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
            .join(', ')}`}
        />
      </Head>
      <SearchBarLayout
        searchBarProps={{
          search,
          setSearch,
          isLoading: false,
          handleSearchExecute,
          target: 'literature',
        }}
      >
        {!cards.length ? (
          <Typography variant="h4">No Results</Typography>
        ) : (
          <Deck cards={cards} />
        )}
      </SearchBarLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { getAuthors: authors } = await useGetAuthorsQuery.fetcher()()
  return { props: { authors } }
}
