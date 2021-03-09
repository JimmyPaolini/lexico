import { QueryFunctionContext, useQuery } from "react-query"
import searchLatinQuery from "../../graphql/search/searchLatin.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useSearchLatin(searched: string) {
  return useQuery(["searchLatin", searched], searchLatin, { retry: false })
}

async function searchLatin({
  queryKey: [, search],
}: QueryFunctionContext<any>) {
  if (!search) return undefined
  const { searchLatin: data } = await graphQLClient.request(searchLatinQuery, {
    search,
  })
  return data
}
