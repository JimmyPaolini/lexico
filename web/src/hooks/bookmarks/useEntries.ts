import { QueryFunctionContext, useQuery } from "react-query"
import entriesQuery from "../../graphql/bookmarks/entries.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useEntries(ids: string[]) {
  return useQuery(["entries", ids], entries, {
    retryDelay: 0,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  })
}

export async function entries({
  queryKey: [, ids],
}: QueryFunctionContext<any>) {
  try {
    const { entries: data } = await graphQLClient.request(entriesQuery, { ids })
    return data
  } catch {
    return null
  }
}
