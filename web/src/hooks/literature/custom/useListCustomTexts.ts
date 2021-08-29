import { useQuery } from "react-query"
import { graphQLClient } from "../../../pages/_app"
import listCustomTextsQuery from "../../graphql/literature/custom/listCustomTexts.graphql"

export default function useListCustomTexts(): ReturnType<typeof useQuery> {
  return useQuery(
    "listCustomTexts",
    async () => {
      const { listCustomTexts: data } = await graphQLClient.request(
        listCustomTextsQuery,
      )
      return data
    },
    { cacheTime: 0 },
  )
}
