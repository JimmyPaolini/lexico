import { Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { GetServerSideProps } from "next"
import { useContext, useEffect, useMemo, useState } from "react"
import Entry from "../../../entity/dictionary/Entry"
import BookmarkInstructionsCard from "../components/accessories/BookmarkInstructionsCard"
import CardDeck from "../components/accessories/CardDeck"
import SearchBarLayout from "../components/accessories/SearchBarLayout"
import { Context } from "../components/Context"
import EntryCard from "../components/EntryCard/EntryCard"
import LoginCard from "../components/settings/LoginCard"
import useBookmarks, { bookmarks } from "../hooks/bookmarks/useBookmarks"
import { normalize } from "../utils/string"
import { queryClient } from "./_app"

export default function Bookmarks() {
  const classes = useStyles()
  const { user } = useContext(Context)
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)

  useEffect(() => {
    if (!search) setSearched("")
  }, [search])

  const { data: bookmarks, isLoading, isSuccess } = useBookmarks(user !== null)

  const cards = useMemo(() => {
    const filteredEntries = filterEntries(bookmarks, searched) || []
    return filteredEntries.length
      ? filteredEntries.map((entry: Entry) => ({
          key: entry.id,
          Card: () => <EntryCard {...{ entry, searched }} />,
        }))
      : [
          {
            key: "no results",
            Card: () => <Typography variant="h4">Not Found</Typography>,
          },
        ]
  }, [user, bookmarks, searched])

  if (user === null) {
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item className={classes.loginCard}>
          <LoginCard title="sign in to use bookmarks" />
        </Grid>
      </Grid>
    )
  }

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
        entry.partOfSpeech.match(re)
      )
    }) || []
  )
}

const useStyles = makeStyles((theme: any) => ({
  loginCard: {
    marginTop: theme.spacing(4),
  },
}))
