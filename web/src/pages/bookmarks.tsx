import { useMemo, useState } from 'react'

import Head from 'next/head'

import { Typography } from '@mui/material'

import { GetServerSideProps } from 'next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { useBookmarks } from 'src/components/bookmarks'
import {
  BookmarkInstructions,
  useBookmarkInstructions,
} from 'src/components/bookmarks/BookmarkInstructions'
import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { useBookmarksQuery } from 'src/graphql/generated'
import { identifyEntryWord } from 'src/utils/identifiers'

import { Entry } from '../components/Entry/Entry'
import { filterBookmarks } from '../components/bookmarks/BookmarkButton'
import { Deck } from '../components/layout/Deck'
import { SearchBarLayout } from '../components/layout/SearchBarLayout'

export default function Bookmarks() {
  const { user } = useLexicoContext()

  const [search, setSearch] = useState<string>('')

  const { bookmarks, isLoading, isSuccess } = useBookmarks()

  const Cards = useMemo(() => {
    const filteredEntries = filterBookmarks(bookmarks, search) || []

    return filteredEntries.length
      ? filteredEntries.map((entry) => {
          entry = identifyEntryWord(search, entry)
          return <Entry {...{ entry, searched: search }} key={entry.id} />
        })
      : [
          <Typography variant="h4" align="center" key="NotFound">
            Not Found
          </Typography>,
        ]
  }, [user, bookmarks, search])

  useBookmarkInstructions(user)

  return (
    <>
      <Head>
        <title>Lexico - Bookmarks</title>
      </Head>
      <SearchBarLayout
        handleSearch={(search) => setSearch(search)}
        isLoading={isLoading}
        placeholder="Search Bookmarks"
      >
        {isLoading ? null : isSuccess &&
          Array.isArray(bookmarks) &&
          !bookmarks.length ? (
          <BookmarkInstructions />
        ) : (
          <Deck Cards={Cards} />
        )}
      </SearchBarLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    useBookmarksQuery.getKey({}),
    useBookmarksQuery.fetcher()
  )
  return { props: { dehydratedState: dehydrate(queryClient) } }
}
