import { QueryFunctionContext, useQuery } from "react-query"
import searchEnglishQuery from "../../graphql/search/searchEnglish.graphql"
import searchLatinQuery from "../../graphql/search/searchLatin.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useSearch(
  searched: string,
  isLatin: boolean,
): ReturnType<typeof useQuery> {
  const options = {
    enabled: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  }
  return isLatin
    ? useQuery(["searchLatin", searched], useSearchLatinQuery, options)
    : useQuery(["searchEnglish", searched], useSearchEnglishQuery, options)
}

async function useSearchLatinQuery({
  queryKey: [, search],
}: QueryFunctionContext<[string, string]>) {
  const { searchLatin: data } = await graphQLClient.request(searchLatinQuery, {
    search,
  })
  return data
}

async function useSearchEnglishQuery({
  queryKey: [, search],
}: QueryFunctionContext<[string, string]>) {
  const { searchEnglish: data } = await graphQLClient.request(
    searchEnglishQuery,
    {
      search,
    },
  )
  return data
}
