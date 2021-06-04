import { useQuery } from "react-query"
import bookmarksQuery from "../../graphql/bookmarks/bookmarks.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useBookmarks() {
  return useQuery("bookmarks", bookmarks, {
    retryDelay: 0,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  })
}

export async function bookmarks() {
  try {
    const { bookmarks: data } = await graphQLClient.request(bookmarksQuery)
    return data
  } catch {
    return null
  }
}
