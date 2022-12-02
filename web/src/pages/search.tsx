import { useState } from 'react'

import { Typography } from '@mui/material'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSearch } from 'src/hooks/search/useSearch'
import { googleAnalyticsEvent } from 'src/utils/googleAnalytics'

import { Entry } from '../components/Entry/Entry'
import { Logo } from '../components/accessories/Logo'
import { Deck } from '../components/layout/Deck'
import { SearchBarLayout } from '../components/layout/SearchBarLayout'
import { getSearchPageMetadata } from '../components/search/getSearchPageMetadata'

type Props = { initialSearch: string }

export default function Search({ initialSearch }: Props) {
  const router = useRouter()

  const [search, setSearch] = useState<string>(initialSearch)

  const { entries, isLoading } = useSearch(search)

  const handleSearch = (search: string) => {
    setSearch(search)
    const hash = '?search=' + search
    router.push(router.pathname + hash)
    googleAnalyticsEvent('search', {
      category: 'search',
      label: '',
      value: search,
    })
  }

  const cards =
    entries?.map((entry) => <Entry {...{ entry, searched: search }} />) || []

  const { title, description, keywords } = getSearchPageMetadata(search)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <SearchBarLayout
        initialSearch={search}
        handleSearch={handleSearch}
        isLoading={isLoading && !!search}
        placeholder="Search Lexico"
      >
        {!search ? (
          <Logo />
        ) : !entries?.length && !isLoading ? (
          <Typography variant="h4">No Results</Typography>
        ) : (
          <Deck cards={cards} />
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
