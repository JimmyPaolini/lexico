import { useQuery } from "react-query"
import Entry from "../../../../entity/dictionary/Entry"
import bookmarksQuery from "../../graphql/bookmarks/bookmarks.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useBookmarks(): ReturnType<typeof useQuery> {
  return useQuery("bookmarks", bookmarks, {
    retryDelay: 0,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  })
}

export async function bookmarks(): Promise<Entry[] | null> {
  try {
    const { bookmarks: data } = await graphQLClient.request(bookmarksQuery)
    return data
  } catch {
    return null
  }
}
