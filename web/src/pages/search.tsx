import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import CardDeck from "../components/accessories/CardDeck"
import Logo from "../components/accessories/Logo"
import EntryCard from "../components/entry/EntryCard"
import SearchBarLayout from "../components/layout/SearchBarLayout"
import getSearchPageMetadata from "../components/search/getSearchPageMetadata"
import { Entry } from "../graphql/generated"
import useSearch from "../hooks/search/useSearch"
import { googleAnalyticsEvent } from "../utils/googleAnalytics"

interface SearchProps {
  initialSearch: string
  initialIsLatin: boolean
}
export default function Search({ initialSearch, initialIsLatin }: SearchProps) {
  const router = useRouter()

  const [isLatin, setLatin] = useState<boolean>(initialIsLatin)
  const [search, setSearch] = useState<string>(initialSearch)
  const [searched, setSearched] = useState<string>(initialSearch)

  const { entries, isLoading } = useSearch(isLatin, searched)

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
  }, [searched, isLatin])

  const cards =
    entries?.map((entry: Entry) => {
      const Card = <EntryCard {...{ entry, searched }} />
      return { key: entry.id, Card }
    }) || []

  const { title, description, keywords } = getSearchPageMetadata(
    searched,
    isLatin,
  )

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <SearchBarLayout
        searchBarProps={{
          search,
          setSearch,
          isLoading: isLoading && !!search,
          handleSearchExecute: () => setSearched(search),
          target: "lexico",
          isLatin,
          setLatin,
        }}
      >
        {!searched ? (
          <Logo />
        ) : !entries?.length && !isLoading ? (
          <Typography variant="h4">No Results</Typography>
        ) : (
          <CardDeck cards={cards} />
        )}
      </SearchBarLayout>
    </>
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
