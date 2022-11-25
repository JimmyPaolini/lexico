import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Entry } from '../components/Entry/Entry'
import CardDeck from '../components/accessories/CardDeck'
import Logo from '../components/accessories/Logo'
import SearchBarLayout from '../components/layout/SearchBarLayout'
import getSearchPageMetadata from '../components/search/getSearchPageMetadata'
import { useSearch } from '../hooks/search/useSearch'
import { googleAnalyticsEvent } from '../utils/googleAnalytics'

type Props = { initialSearch: string }

export default function Search({ initialSearch }: Props) {
  const router = useRouter()

  const [search, setSearch] = useState<string>(initialSearch)
  const [searched, setSearched] = useState<string>(initialSearch)

  const { entries, isLoading } = useSearch(searched)

  useEffect(() => {
    if (!search) setSearched('')
  }, [search])
  useEffect(() => {
    if (!searched) return
    const hash = '?search=' + searched
    router.push(router.pathname + hash)
    googleAnalyticsEvent('search', {
      category: 'search',
      label: '',
      value: searched,
    })
  }, [searched])

  const cards =
    entries?.map((entry) => {
      const Card = <Entry {...{ entry, searched }} />
      return { key: entry.id, Card }
    }) || []

  const { title, description, keywords } = getSearchPageMetadata(searched)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <SearchBarLayout
        searchBarProps={{
          search,
          setSearch,
          isLoading: isLoading && !!search,
          handleSearchExecute: () => setSearched(search),
          target: 'lexico',
        }}
      >
        {!searched ? (
          <Logo />
        ) : !entries?.length && !isLoading ? (
          <Typography variant="h4">No Results</Typography>
        ) : (
          <CardDeck cards={cards} />
        )}
      </SearchBarLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { search },
}) => {
  return { props: { initialSearch: search ?? '' } }
}
