import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { UseQueryResult } from "react-query"
import Entry from "../../../entity/dictionary/Entry"
import CardDeck from "../components/accessories/CardDeck"
import Logo from "../components/accessories/Logo"
import EntryCard from "../components/EntryCard/EntryCard"
import SearchBarLayout from "../components/layout/SearchBarLayout"
import useSearch from "../hooks/search/useSearch"

interface Props {
  initialSearch: string
  initialIsLatin: boolean
}
export default function Search({
  initialSearch,
  initialIsLatin,
}: Props): JSX.Element {
  const router = useRouter()

  const [isLatin, setLatin] = useState<boolean>(initialIsLatin)
  const [search, setSearch] = useState<string>(initialSearch)

  const {
    data: entries,
    refetch: fetch,
    isLoading,
  } = useSearch(search, isLatin) as UseQueryResult<Entry[], unknown>

  const executeSearch = () => {
    if (!search) return
    fetch()
    const hash = (isLatin ? "?latin=" : "?english=") + search
    router.push(router.pathname + hash)
  }

  useEffect(() => executeSearch(), [isLatin])

  const cards =
    entries?.map((entry: Entry) => {
      const Card = () => <EntryCard {...{ entry, searched: search }} />
      return { key: entry.id, Card }
    }) || []

  return (
    <SearchBarLayout
      searchBarProps={{
        search,
        setSearch,
        isLoading: isLoading && !!search,
        handleSearchExecute: executeSearch,
        target: "lexico",
        isLatin,
        setLatin,
      }}>
      {!search ? (
        <Logo />
      ) : !entries?.length ? (
        <Typography variant="h4">No Results</Typography>
      ) : (
        <CardDeck cards={cards} />
      )}
    </SearchBarLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { latin, english },
}) => {
  const initialIsLatin = !english
  const initialSearch = latin || english || ""
  return {
    props: { initialSearch, initialIsLatin },
  }
}
