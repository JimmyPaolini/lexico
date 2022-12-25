import { useMemo, useState } from 'react'

import Head from 'next/head'

import { Typography } from '@mui/material'

import { GetStaticProps } from 'next'

import { Author, useAuthorsQuery } from 'src/graphql/generated'

import { Deck } from '../components/layout/Deck'
import { SearchBarLayout } from '../components/layout/SearchBarLayout'
import { CustomTextsCard } from '../components/library/CustomTextsCard/CustomTextsCard'
import { LibraryCard } from '../components/library/LibraryCard'
import { filterLibrary } from '../components/library/filterLibrary'

type Props = { authors: Author[] }

export default function Library({ authors }: Props) {
  const [searched, setSearched] = useState<string>('')

  const authorsCopy = JSON.parse(JSON.stringify(authors))
  const Cards = useMemo(() => {
    const Cards = filterLibrary(authorsCopy, searched).map((author) => (
      <LibraryCard {...{ author }} key={author.id} />
    ))
    Cards.unshift(<CustomTextsCard />)
    return Cards
  }, [searched])

  return (
    <>
      <Head>
        <title>Lexico - Library</title>
        <meta
          name="description"
          content="Read and translate Latin literature from authors like Caesar and Virgil, or input your own Latin text"
        />
        <meta
          name="keywords"
          content={`Latin, Library, Literature, Read, English, Translation, ${authors
            .map((author) => author.name)
            .join(', ')}`}
        />
      </Head>
      <SearchBarLayout
        handleSearch={(search) => setSearched(search)}
        isLoading={false}
        placeholder="Search Library"
      >
        {!Cards.length ? (
          <Typography variant="h4">No Results</Typography>
        ) : (
          <Deck Cards={Cards} />
        )}
      </SearchBarLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { authors } = await useAuthorsQuery.fetcher()()
  return { props: { authors } }
}
