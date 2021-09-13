import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useContext, useEffect, useMemo, useState } from "react"
import CardDeck from "../components/accessories/CardDeck"
import BookmarkInstructionsCard from "../components/bookmarks/BookmarkInstructionsCard"
import filterBookmarks from "../components/bookmarks/filterBookmarks"
import EntryCard from "../components/entry/EntryCard"
import { Context } from "../components/layout/Context"
import SearchBarLayout from "../components/layout/SearchBarLayout"
import useBookmarkInstructions from "../hooks/bookmarks/useBookmarkInstructions"
import { Entry, useBookmarksQuery, useEntriesQuery } from "../graphql/generated"
import { getBookmarksLocal } from "../utils/bookmarksLocal"
import identifyEntryWord from "../utils/identifiers"
import { queryClient } from "./_app"

export default function Bookmarks(): JSX.Element {
  const { user } = useContext(Context)
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)

  useEffect(() => {
    if (!search) setSearched("")
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
  ) as Entry[]
  const isLoading = user ? isLoadingBookmarks : isLoadingEntries
  const isSuccess = user ? isSuccessBookmarks : isSuccessEntries

  const cards = useMemo(() => {
    const filteredEntries = filterBookmarks(bookmarks, searched) || []

    return filteredEntries.length
      ? filteredEntries.map((entry) => {
          entry = identifyEntryWord(searched, entry)
          return {
            key: entry.id,
            Card: <EntryCard {...{ entry, searched }} />,
          }
        })
      : [
          {
            key: "no results",
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
          target: "bookmarks",
        }}>
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
  await queryClient.prefetchQuery(
    useBookmarksQuery.getKey(),
    useBookmarksQuery.fetcher(),
  )
  return { props: {} }
}
