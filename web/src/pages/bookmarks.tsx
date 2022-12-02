import { useContext, useEffect, useMemo, useState } from 'react'

import { Typography } from '@mui/material'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { useBookmarksQuery } from 'src/graphql/generated'
import { useBookmarkInstructions } from 'src/hooks/bookmarks/useBookmarkInstructions'
import { useBookmarks } from 'src/hooks/bookmarks/useBookmarks'
import { identifyEntryWord } from 'src/utils/identifiers'

import { Entry } from '../components/Entry/Entry'
import { BookmarkInstructionsCard } from '../components/bookmarks/BookmarkInstructionsCard'
import { filterBookmarks } from '../components/bookmarks/filterBookmarks'
import { Context } from '../components/layout/Context'
import { Deck } from '../components/layout/Deck'
import { SearchBarLayout } from '../components/layout/SearchBarLayout'

export default function Bookmarks() {
  const { user } = useContext(Context)
  const [search, setSearch] = useState<string>('')
  const [searched, setSearched] = useState<string>(search)

  useEffect(() => {
    if (!search) setSearched('')
  }, [search])

  const { bookmarks, isLoading, isSuccess } = useBookmarks()

  const cards = useMemo(() => {
    const filteredEntries = filterBookmarks(bookmarks, searched) || []

    return filteredEntries.length
      ? filteredEntries.map((entry) => {
          entry = identifyEntryWord(searched, entry)
          return <Entry {...{ entry, searched }} />
        })
      : [
          <Typography variant="h4" align="center">
            Not Found
          </Typography>,
        ]
  }, [user, bookmarks, searched])

  useBookmarkInstructions(user)

  return (
    <>
      <Head>
        <title>Lexico - Bookmarks</title>
      </Head>
      <SearchBarLayout
        handleSearch={() => setSearched(search)}
        isLoading={isLoading}
        placeholder="Search Bookmarks"
      >
        {isLoading ? null : isSuccess &&
          Array.isArray(bookmarks) &&
          !bookmarks.length ? (
          <BookmarkInstructionsCard />
        ) : (
          <Deck cards={cards} />
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
