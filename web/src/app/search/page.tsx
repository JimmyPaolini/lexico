import { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSearch } from 'src/hooks/search/useSearch'
import { googleAnalyticsEvent } from 'src/utils/googleAnalytics'

import { Entry } from '../../components/Entry/Entry'
import { Logo } from '../../components/accessories/Logo'
import { Deck } from '../../components/layout/Deck'
import { SearchBarLayout } from '../../components/layout/SearchBarLayout'
import { getSearchPageMetadata } from '../../components/search/getSearchPageMetadata'

;('use client')

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
    entries?.map((entry) => <Entry {...{ entry, searched }} />) || []

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
