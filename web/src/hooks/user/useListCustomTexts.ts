import { useQuery } from "react-query"
import listCustomTextsQuery from "../../graphql/user/listCustomTexts.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useListCustomTexts(): ReturnType<typeof useQuery> {
  return useQuery(
    "listCustomTexts",
    async () => {
      const { listCustomTexts: data } = await graphQLClient.request(
        listCustomTextsQuery,
      )
      return data
    },
  )
}
