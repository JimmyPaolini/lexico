import { Grid, Typography } from "@material-ui/core"
import React, { useEffect, useMemo, useState } from "react"
import { QueryFunctionContext, useQuery } from "react-query"
import Entry from "../../../server/src/entity/dictionary/Entry"
import CardDeck from "../components/CardDeck"
import EntryCard from "../components/EntryCard/EntryCard"
import Home from "../components/search/Home"
import SearchBar from "../components/search/SearchBar"
import searchEnglish from "../graphql/search/searchEnglish.gql"
import searchLatin from "../graphql/search/searchLatin.gql"
import { graphQLClient } from "./_app"

export default function Search() {
  const [isLatin, setLatin] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)
  useEffect(() => {
    refetch()
  }, [searched])

  const { data: entries, error, isLoading, refetch } = useSearch(searched, isLatin)

  const noEntriesFound = Array.isArray(entries) && !entries.length
  const entriesFound = !error && Array.isArray(entries) && entries.length
  const cards = useMemo(
    () =>
      entries?.map((entry: Entry) => ({
        key: entry.id,
        Card: () =>
          useMemo(() => <EntryCard {...{ entry, searched: searched }} />, []),
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
            isLoading,
            handleSearchExecute: () => setSearched(search),
            target: "lexico",
            isLatin,
            setLatin,
          }}
        />
      </Grid>
      <Grid item container justify="center">
        {!entries ? (
          <Home />
        ) : noEntriesFound ? (
          <Typography variant="h4">Not Found</Typography>
        ) : entriesFound ? (
          <CardDeck cards={cards} />
        ) : null}
      </Grid>
    </Grid>
  )
}

function useSearch(search: string, isLatin: boolean) {
  return useQuery(["search", search, isLatin], useSearchQuery, {
    enabled: false,
    keepPreviousData: true,
  })
}

async function useSearchQuery({
  queryKey: [, search, isLatin],
}: QueryFunctionContext<any>) {
  if (!search) return null
  const query = isLatin ? searchLatin : searchEnglish
  const { searchLatin: data } = await graphQLClient.request(query, { search })
  return data
}
