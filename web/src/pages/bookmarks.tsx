import { Grid } from "@material-ui/core"
import { GetServerSideProps } from "next"
import React, { useMemo, useState } from "react"
import Entry from "../../../entity/dictionary/Entry"
import BookmarkInstructionsCard from "../components/accessories/BookmarkInstructionsCard"
import CardDeck from "../components/accessories/CardDeck"
import EntryCard from "../components/EntryCard/EntryCard"
import SearchBar from "../components/search/SearchBar"
import LoginCard from "../components/settings/LoginCard"
import bookmarksQuery from "../graphql/bookmarks/bookmarks.graphql"
import useBookmarks from "../hooks/bookmarks/useBookmarks"
import { normalize } from "../utils/string"
import { graphQLClient, queryClient } from "./_app"

interface Props {
  isLoggedIn: boolean
}
export default function Bookmarks({ isLoggedIn }: Props) {
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)

  const { data: bookmarks, isLoading, isError, isSuccess } = useBookmarks(
    isLoggedIn,
  )

  const cards = useMemo(() => {
    if (!isLoggedIn)
      return [
        {
          key: "bookmarks login card",
          Card: () => <LoginCard title="sign in to use bookmarks" />,
        },
      ]
    if (isSuccess && Array.isArray(bookmarks) && !bookmarks.length) {
      return [
        {
          key: "bookmark instructions card",
          Card: () => <BookmarkInstructionsCard />,
        },
      ]
    }
    return (
      filterEntries(bookmarks, searched).map((entry: Entry) => ({
        key: entry.id,
        Card: () => <EntryCard {...{ entry, searched }} />,
      })) || []
    )
  }, [isLoggedIn, bookmarks, searched])

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <SearchBar
          {...{
            search,
            setSearch,
            isLoading,
            handleSearchExecute: () => setSearched(search),
            target: "bookmarks",
          }}
        />
      </Grid>
      <Grid item container justify="center">
        {isLoading ? null : isError ? (
          <div>no bookmarks</div>
        ) : (
          <CardDeck cards={cards} />
        )}
      </Grid>
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req: { rawHeaders },
}) => {
  if (rawHeaders.indexOf("Cookie") < 0)
    return {
      props: { isLoggedIn: false },
    }
  const Cookie = rawHeaders[rawHeaders.indexOf("Cookie") + 1]
  await queryClient.prefetchQuery("bookmarks", async () => {
    const { bookmarks: data } = await graphQLClient.request(
      bookmarksQuery,
      {},
      { Cookie },
    )
    return data
  })
  return {
    props: { isLoggedIn: true },
  }
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
