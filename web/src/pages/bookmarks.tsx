import { Grid } from "@material-ui/core"
import React, { useEffect, useMemo, useState } from "react"
import Entry from "../../../server/src/entity/dictionary/Entry"
import CardDeck from "../components/CardDeck"
import EntryCard from "../components/EntryCard/EntryCard"
import SearchBar from "../components/search/SearchBar"
import { useBookmarks } from "../utils/bookmarks"

type Card = { key: string; Card: () => JSX.Element }

export default function Search() {
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)

  const { data: bookmarks, isLoading, isError } = useBookmarks()
  const bookmarksFiltered = useMemo<Entry[]>(
    () => filterEntries(bookmarks, searched),
    [searched],
  )

  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    setCards(
      bookmarksFiltered?.map((entry: Entry) => ({
        key: entry.id,
        Card: () => <EntryCard {...{ entry, searched: searched }} />,
      })),
    )
  }, [bookmarksFiltered])

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

const filterEntries = (entries: Entry[], search: string) => {
  const re = new RegExp(search, "i")
  return (
    entries?.filter((entry: Entry) => {
      return (
        entry.principalParts?.some((principalPart) =>
          principalPart.text.some((principalPartText) =>
            principalPartText.match(re),
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
