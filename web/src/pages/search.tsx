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
import { googleAnalyticsEvent } from "../utils/googleAnalytics"

interface SearchProps {
  initialSearch: string
  initialIsLatin: boolean
}
export default function Search({
  initialSearch,
  initialIsLatin,
}: SearchProps): JSX.Element {
  const router = useRouter()

  const [isLatin, setLatin] = useState<boolean>(initialIsLatin)
  const [search, setSearch] = useState<string>(initialSearch)
  const [searched, setSearched] = useState<string>(initialSearch)

  const { data: entries, isLoading } = useSearch(
    searched,
    isLatin,
  ) as UseQueryResult<Entry[], unknown>

  useEffect(() => setSearched(search), [isLatin])
  useEffect(() => {
    if (!search) setSearched("")
  }, [search])
  useEffect(() => {
    if (!searched) return
    const hash = (isLatin ? "?latin=" : "?english=") + searched
    router.push(router.pathname + hash)
    googleAnalyticsEvent("search", {
      category: "search",
      label: isLatin ? "latin" : "english",
      value: searched,
    })
  }, [searched])

  const cards =
    entries?.map((entry: Entry) => {
      const Card = <EntryCard {...{ entry, searched }} />
      return { key: entry.id, Card }
    }) || []

  return (
    <SearchBarLayout
      searchBarProps={{
        search,
        setSearch,
        isLoading: isLoading && !!search,
        handleSearchExecute: () => setSearched(search),
        target: "lexico",
        isLatin,
        setLatin,
      }}>
      {!searched ? (
        <Logo />
      ) : !entries?.length && !isLoading ? (
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
