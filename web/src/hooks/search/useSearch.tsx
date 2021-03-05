import { QueryFunctionContext, useQuery } from "react-query"
import searchEnglish from "../../graphql/search/searchEnglish.gql"
import searchLatin from "../../graphql/search/searchLatin.gql"
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
  const query = isLatin ? searchLatin : searchEnglish
  const { searchLatin: data } = await graphQLClient.request(query, { search })
  return data
}
