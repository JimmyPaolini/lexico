import { Button, IconButton, Typography } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { useContext, useEffect, useMemo, useState } from "react"
import Entry from "../../../entity/dictionary/Entry"
import CardDeck from "../components/accessories/CardDeck"
import BookmarkInstructionsCard from "../components/bookmarks/BookmarkInstructionsCard"
import { Context } from "../components/Context"
import EntryCard from "../components/EntryCard/EntryCard"
import SearchBarLayout from "../components/SearchBar/SearchBarLayout"
import useBookmarks, { bookmarks } from "../hooks/bookmarks/useBookmarks"
import useEntries from "../hooks/bookmarks/useEntries"
import identifyEntryWord from "../utils/identifiers"
import { getBookmarksLocal } from "../utils/localBookmarks"
import { normalize } from "../utils/string"
import { queryClient } from "./_app"

export default function Bookmarks() {
  const { user } = useContext(Context)
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)

  useEffect(() => {
    if (!search) setSearched("")
  }, [search])

  let bookmarks: Entry[], isLoading: boolean, isSuccess: boolean
  if (!!user) {
    const response = useBookmarks()
    bookmarks = response.data
    isLoading = response.isLoading
    isSuccess = response.isSuccess
  } else {
    const response = useEntries(getBookmarksLocal())
    bookmarks = response.data
    isLoading = response.isLoading
    isSuccess = response.isSuccess
  }

  const cards = useMemo(() => {
    const filteredEntries = filterEntries(bookmarks, searched) || []
    return filteredEntries.length
      ? filteredEntries.map((entry: Entry) => {
          entry = identifyEntryWord(searched, entry)
          return {
            key: entry.id,
            Card: () => <EntryCard {...{ entry, searched }} />,
          }
        })
      : [
          {
            key: "no results",
            Card: () => (
              <Typography variant="h4" align="center">
                Not Found
              </Typography>
            ),
          },
        ]
  }, [user, bookmarks, searched])

  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  useEffect(() => {
    if (!user) {
      const readerInstructions = `Your bookmarks are saved locally, sign in to save them across devices/browsers`
      enqueueSnackbar(readerInstructions, {
        variant: "info",
        autoHideDuration: 10000,
        action: (key: any) => (
          <>
            <Button
              onClick={() => {
                closeSnackbar(key)
                router.push("/user")
              }}
              color="secondary"
            >
              Sign in
            </Button>
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <Close />
            </IconButton>
          </>
        ),
      })
    }
  }, [])

  return (
    <SearchBarLayout
      searchBarProps={{
        search,
        setSearch,
        isLoading,
        handleSearchExecute: () => setSearched(search),
        target: "bookmarks",
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
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery("bookmarks", bookmarks)
  return { props: {} }
}

const filterEntries = (entries: Entry[], search: string) => {
  const re = new RegExp(search, "i")
  return (
    entries?.filter((entry: Entry) => {
      return (
        entry.principalParts?.some((principalPart) =>
          principalPart.text.some((principalPartText) =>
            normalize(principalPartText).match(re),
          ),
        ) ||
        entry.translations?.some((translation) =>
          translation.translation.match(re),
        ) ||
        entry.partOfSpeech.match(re) ||
        normalize(JSON.stringify(entry?.forms || "false")).match(re)
      )
    }) || []
  )
}
