import { QueryFunctionContext, useQuery } from "react-query"
import searchEnglish from "../../graphql/search/searchEnglish.graphql"
import searchLatin from "../../graphql/search/searchLatin.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useSearch(search: string, isLatin: boolean) {
  return useQuery(["search", search, isLatin], useSearchQuery, {
    enabled: false,
    retry: false,
  })
}

async function useSearchQuery({
  queryKey: [, search, isLatin],
}: QueryFunctionContext<any>) {
  if (isLatin) {
    const { searchLatin: data } = await graphQLClient.request(searchLatin, {
      search,
    })
    return data
  } else {
    const { searchEnglish: data } = await graphQLClient.request(searchEnglish, {
      search,
    })
    return data
  }
}
