import { Grid, Typography } from "@material-ui/core"
import { request } from "graphql-request"
import Image from "next/image"
import React, { useEffect, useMemo, useState } from "react"
import { QueryFunctionContext, useQuery } from "react-query"
import Entry from "../../../server/src/entity/dictionary/Entry"
import CardDeck from "../components/CardDeck"
import EntryCard from "../components/EntryCard/EntryCard"
import SearchBar from "../components/Search/SearchBar"
import searchEnglish from "../graphql/searchEnglish.gql"
import searchLatin from "../graphql/searchLatin.gql"
import { endpoint } from "../pages/_app"

export default function Search() {
  const [isLatin, setLatin] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)
  useEffect(() => {
    refetch()
  }, [searched])

  const { data, error, isLoading, refetch } = useSearch(searched, isLatin)

  const noEntriesFound = Array.isArray(data) && !data.length
  const entriesFound = !error && Array.isArray(data) && data.length
  const cards = useMemo(
    () =>
      data?.map((entry: Entry) => ({
        key: entry.id,
        Card: () =>
          useMemo(() => <EntryCard {...{ entry, searched: searched }} />, []),
      })),
    [data],
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
            isLatin,
            setLatin,
          }}
          target="lexico"
        />
      </Grid>
      <Grid item container justify="center">
        {!data ? (
          <Image src="/lexico_logo.png" alt="Lexico" height={500} width={375} />
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
  const { searchLatin: data } = await request(endpoint, query, { search })
  return data
}
