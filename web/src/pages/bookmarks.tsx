import { Grid } from "@material-ui/core"
import Image from "next/image"
import React, { useMemo, useState } from "react"
import Entry from "../../../server/src/entity/dictionary/Entry"
import CardDeck from "../components/CardDeck"
import EntryCard from "../components/EntryCard/EntryCard"
import SearchBar from "../components/Search/SearchBar"
import { getBookmarks } from "../utils/bookmarks"

export default function Search() {
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)
  const bookmarks = useMemo<Entry[]>(() => getBookmarks(), [])
  const data = useMemo<Entry[]>(() => {
    const re = new RegExp(search, "i")
    return bookmarks.filter((entry) => {
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
    })
  }, [searched])

  const entriesFound = Array.isArray(data) && data.length
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
            handleSearchExecute: () => setSearched(search),
            target: "bookmarks",
          }}
        />
      </Grid>
      <Grid item container justify="center">
        {!data ? (
          <Image src="/lexico_logo.png" alt="Lexico" height={500} width={375} />
        ) : entriesFound ? (
          <CardDeck cards={cards} />
        ) : null}
      </Grid>
    </Grid>
  )
}
