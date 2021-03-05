import { Grid, Typography } from "@material-ui/core"
import React, { useEffect, useMemo, useState } from "react"
import Entry from "../../../entity/dictionary/Entry"
import CardDeck from "../components/accessories/CardDeck"
import EntryCard from "../components/EntryCard/EntryCard"
import Home from "../components/search/Home"
import SearchBar from "../components/search/SearchBar"
import useSearch from "../hooks/search/useSearch"

export default function Search() {
  const [isLatin, setLatin] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)
  useEffect(() => {
    if (!search) setSearched("")
  }, [search])
  useEffect(() => {
    refetch()
  }, [searched])

  const { data: entries, error, isLoading, refetch, isSuccess } = useSearch(
    searched,
    isLatin,
  )

  const noEntriesFound = isSuccess && Array.isArray(entries) && !entries.length
  const entriesFound = !error && Array.isArray(entries) && entries.length
  const cards = useMemo(
    () =>
      entries?.map((entry: Entry) => ({
        key: entry.id,
        Card: () => useMemo(() => <EntryCard {...{ entry, searched }} />, []),
      })),
    [entries],
  )

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <SearchBar
          {...{
            search,
            setSearch,
            isLoading: isLoading && !!searched,
            handleSearchExecute: () => setSearched(search),
            target: "lexico",
            isLatin,
            setLatin,
          }}
        />
      </Grid>
      <Grid item container justify="center">
        {noEntriesFound ? (
          <Typography variant="h4">Not Found</Typography>
        ) : !entries ? (
          <Home />
        ) : entriesFound ? (
          <CardDeck cards={cards} />
        ) : null}
      </Grid>
    </Grid>
  )
}
