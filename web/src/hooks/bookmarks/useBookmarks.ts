import { useQuery } from "react-query"
import bookmarksQuery from "../../graphql/bookmarks/bookmarks.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useBookmarks(enabled: boolean) {
  return useQuery(
    "bookmarks",
    async () => {
      const { bookmarks: data } = await graphQLClient.request(bookmarksQuery)
      return data
    },
    { enabled, retryDelay: 0, cacheTime: 1000 * 60 * 5 },
  )
}
