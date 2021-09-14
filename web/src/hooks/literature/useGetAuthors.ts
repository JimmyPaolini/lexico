import { useQuery } from "react-query"
import Author from "../../../../entity/literature/Author"
import getAuthorsQuery from "../../graphql/literature/getAuthors.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useGetAuthors(
  initialData: Author[],
): ReturnType<typeof useQuery> {
  return useQuery("getAuthors", getAuthors, {
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 5,
    retryDelay: 0,
    initialData,
  })
}

export async function getAuthors(): Promise<Author[]> {
  const { getAuthors: data } = await graphQLClient.request(getAuthorsQuery)
  return data as Author[]
}
