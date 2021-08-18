import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useContext, useEffect, useMemo, useState } from "react"
import { UseQueryResult } from "react-query"
import Entry from "../../../entity/dictionary/Entry"
import CardDeck from "../components/accessories/CardDeck"
import BookmarkInstructionsCard from "../components/bookmarks/BookmarkInstructionsCard"
import filterBookmarks from "../components/bookmarks/filterBookmarks"
import EntryCard from "../components/entry/EntryCard"
import { Context } from "../components/layout/Context"
import SearchBarLayout from "../components/layout/SearchBarLayout"
import useBookmarkInstructions from "../hooks/bookmarks/useBookmarkInstructions"
import useBookmarks, { bookmarks } from "../hooks/bookmarks/useBookmarks"
import useEntries from "../hooks/bookmarks/useEntries"
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
    data: bookmarks,
    isLoading,
    isSuccess,
  } = (
    user ? useBookmarks() : useEntries(getBookmarksLocal())
  ) as UseQueryResult<Entry[], unknown>

  const cards = useMemo(() => {
    const filteredEntries = filterBookmarks(bookmarks, searched) || []

    return filteredEntries.length
      ? filteredEntries.map((entry: Entry) => {
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
  await queryClient.prefetchQuery("bookmarks", bookmarks)
  return { props: {} }
}
