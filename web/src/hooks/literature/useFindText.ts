import { QueryFunctionContext, useQuery } from "react-query"
import Text from "../../../../entity/literature/Text"
import findTextQuery from "../../graphql/literature/findText.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useFindText(
  initialData: Text,
  author: string,
  title: string,
  book?: string,
): ReturnType<typeof useQuery> {
  return useQuery(["findText", author, title, book], findText, {
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
    retryDelay: 0,
    initialData,
  })
}

export async function findText({
  queryKey: [, author, title, book],
}: QueryFunctionContext<
  [string, string, string, string | undefined]
>): Promise<Text> {
  const { findText: data } = await graphQLClient.request(findTextQuery, {
    author,
    title,
    book,
  })
  return data as Text
}
