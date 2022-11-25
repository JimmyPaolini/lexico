import { useContext, useEffect, useMemo, useState } from 'react'

import { Typography } from '@mui/material'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Entry } from '../components/Entry/Entry'
import CardDeck from '../components/accessories/CardDeck'
import BookmarkInstructionsCard from '../components/bookmarks/BookmarkInstructionsCard'
import filterBookmarks from '../components/bookmarks/filterBookmarks'
import { Context } from '../components/layout/Context'
import SearchBarLayout from '../components/layout/SearchBarLayout'
import {
  Entry as EntryType,
  useBookmarksQuery,
  useEntriesQuery,
} from '../graphql/generated'
import useBookmarkInstructions from '../hooks/bookmarks/useBookmarkInstructions'
import { getBookmarksLocal } from '../utils/bookmarksLocal'
import { identifyEntryWord } from '../utils/identifiers'

export default function Bookmarks() {
  const { user } = useContext(Context)
  const [search, setSearch] = useState<string>('')
  const [searched, setSearched] = useState<string>(search)

  useEffect(() => {
    if (!search) setSearched('')
  }, [search])

  const {
    data: dataBookmarks,
    isLoading: isLoadingBookmarks,
    isSuccess: isSuccessBookmarks,
  } = useBookmarksQuery(
    {},
    {
      enabled: !!user,
      retryDelay: 0,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    },
  )

  const {
    data: dataEntries,
    isLoading: isLoadingEntries,
    isSuccess: isSuccessEntries,
  } = useEntriesQuery(
    { ids: getBookmarksLocal() },
    {
      enabled: !user,
      retryDelay: 0,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    },
  )
  const bookmarks = (
    user ? dataBookmarks?.bookmarks : dataEntries?.entries
  ) as EntryType[]
  const isLoading = user ? isLoadingBookmarks : isLoadingEntries
  const isSuccess = user ? isSuccessBookmarks : isSuccessEntries

  const cards = useMemo(() => {
    const filteredEntries = filterBookmarks(bookmarks, searched) || []

    return filteredEntries.length
      ? filteredEntries.map((entry) => {
          entry = identifyEntryWord(searched, entry)
          return {
            key: entry.id,
            Card: <Entry {...{ entry, searched }} />,
          }
        })
      : [
          {
            key: 'no results',
            Card: (
              <Typography variant="h4" align="center">
                Not Found
              </Typography>
            ),
          },
        ]
  }, [user, bookmarks, searched])

  useBookmarkInstructions(user)

  return (
    <>
      <Head>
        <title>Lexico - Bookmarks</title>
      </Head>
      <SearchBarLayout
        searchBarProps={{
          search,
          setSearch,
          isLoading,
          handleSearchExecute: () => setSearched(search),
          target: 'bookmarks',
        }}
      >
        {isLoading ? null : isSuccess &&
          Array.isArray(bookmarks) &&
          !bookmarks.length ? (
          <BookmarkInstructionsCard />
        ) : (
          <CardDeck cards={cards} />
        )}
      </SearchBarLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    useBookmarksQuery.getKey({}),
    useBookmarksQuery.fetcher(),
  )
  return { props: { dehydratedState: dehydrate(queryClient) } }
}
