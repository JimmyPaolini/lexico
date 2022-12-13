import { useMemo, useState } from 'react'

import { Typography } from '@mui/material'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import { Author, useGetAuthorsQuery } from 'src/graphql/generated'

import { Deck } from '../components/layout/Deck'
import { SearchBarLayout } from '../components/layout/SearchBarLayout'
import { LiteratureCard } from '../components/literature/LiteratureCard'
import { CustomLiteratureCard } from '../components/literature/custom/CustomLiteratureCard'
import { filterLiterature } from '../components/literature/filterLiterature'

type Props = { authors: Author[] }

export default function Literature({ authors }: Props) {
  const [searched, setSearched] = useState<string>('')

  const authorsCopy = JSON.parse(JSON.stringify(authors))
  const Cards = useMemo(() => {
    const Cards = filterLiterature(authorsCopy, searched).map((author) => (
      <LiteratureCard {...{ author }} />
    ))
    Cards.unshift(<CustomLiteratureCard />)
    return Cards
  }, [searched])

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
        handleSearch={(search) => setSearched(search)}
        isLoading={false}
        placeholder="Search Literature"
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
  const { getAuthors: authors } = await useGetAuthorsQuery.fetcher()()
  return { props: { authors } }
}
