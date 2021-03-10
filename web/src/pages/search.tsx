import { Grid, Typography } from "@material-ui/core"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import Entry from "../../../entity/dictionary/Entry"
import CardDeck from "../components/accessories/CardDeck"
import EntryCard from "../components/EntryCard/EntryCard"
import Home from "../components/search/Home"
import SearchBar from "../components/search/SearchBar"
import useSearch from "../hooks/search/useSearch"

interface Props {
  initialSearch: string
  initialIsLatin: boolean
}
export default function Search({ initialSearch, initialIsLatin }: Props) {
  const router = useRouter()

  const [isLatin, setLatin] = useState<boolean>(initialIsLatin)
  const [search, setSearch] = useState<string>(initialSearch)
  const [searched, setSearched] = useState<string>(initialSearch)

  useEffect(() => {
    if (!search) setSearched("")
  }, [search])

  useEffect(() => {
    setSearch(initialSearch)
    setSearched(initialSearch)
  }, [initialSearch])

  useEffect(() => {
    refetch()
    const hash = searched ? (isLatin ? "?latin=" : "?english=") + searched : ""
    if (!!searched) router.push(router.pathname + hash)
  }, [searched])

  const useSearchResult = useSearch(searched, isLatin)
  const { data: entries, refetch, isLoading, isSuccess } = useSearchResult

  const noEntriesFound = searched && isSuccess && !entries.length
  const entriesFound = searched && isSuccess && entries.length
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
        {!searched ? (
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

export const getServerSideProps: GetServerSideProps = async ({
  query: { latin, english },
}) => {
  let initialIsLatin = !english
  const initialSearch = latin || english || ""
  return {
    props: { initialSearch, initialIsLatin },
  }
}
