import { QueryFunctionContext, useQuery } from "react-query"
import searchLatinQuery from "../../graphql/search/searchLatin.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useSearchLatin(
  searched: string,
): ReturnType<typeof useQuery> {
  return useQuery(["searchLatin", searched], searchLatin, {
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}

async function searchLatin({
  queryKey: [, search],
}: QueryFunctionContext<[string, string]>) {
  if (!search) return undefined
  const { searchLatin: data } = await graphQLClient.request(searchLatinQuery, {
    search,
  })
  return data
}
