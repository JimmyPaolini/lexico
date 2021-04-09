import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import Entry from "../../../entity/dictionary/Entry"
import CardDeck from "../components/accessories/CardDeck"
import SearchBarLayout from "../components/accessories/SearchBarLayout"
import EntryCard from "../components/EntryCard/EntryCard"
// import Home from "../components/search/Home"
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

  const { data: entries, refetch, isLoading, isSuccess, isError } = useSearch(
    searched,
    isLatin,
  )

  const noEntriesFound = (searched && isSuccess && !entries.length) || isError
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
    <SearchBarLayout
      searchBarProps={{
        search,
        setSearch,
        isLoading: isLoading && !!searched,
        handleSearchExecute: () => setSearched(search),
        target: "lexico",
        isLatin,
        setLatin,
      }}
    >
      {!searched ? null : noEntriesFound ? ( // <Home />
        <Typography variant="h4">No Results</Typography>
      ) : entriesFound ? (
        <CardDeck cards={cards} />
      ) : null}
    </SearchBarLayout>
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
