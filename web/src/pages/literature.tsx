import { Grid } from "@material-ui/core"
import React, { useMemo, useState } from "react"
import { useQuery } from "react-query"
import Author from "../../../server/src/entity/literature/Author"
import CardDeck from "../components/CardDeck"
import AuthorCard from "../components/literature/AuthorCard"
import SearchBar from "../components/search/SearchBar"
import getAuthorsQuery from "../graphql/literature/getAuthors.gql"
import { graphQLClient } from "./_app"

export default function Literature() {
  const [search, setSearch] = useState<string>("")
  const [searched, setSearched] = useState<string>(search)

  const { data: authors, isLoading, isError } = useQuery(
    "getAuthors",
    async () => {
      const { getAuthors: data } = await graphQLClient.request(getAuthorsQuery)
      return data as Author[]
    },
  )

  const cards = useMemo(
    () =>
      authors?.map((author) => ({
        key: author.name,
        Card: () => <AuthorCard {...{ author, searched }} />,
      })) || [],
    [searched, authors],
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
            target: "literature",
          }}
        />
      </Grid>
      <Grid item container justify="center">
        {isLoading ? null : isError ? (
          <div>no literature</div>
        ) : (
          <CardDeck cards={cards} />
        )}
      </Grid>
    </Grid>
  )
}

// const filterEntries = (entries: Entry[], search: string) => {
//   const re = new RegExp(search, "i")
//   return (
//     entries?.filter((entry: Entry) => {
//       return (
//         entry.principalParts?.some((principalPart) =>
//           principalPart.text.some((principalPartText) =>
//             normalize(principalPartText).match(re),
//           ),
//         ) ||
//         entry.translations?.some((translation) =>
//           translation.translation.match(re),
//         ) ||
//         entry.partOfSpeech.match(re)
//       )
//     }) || []
//   )
// }
