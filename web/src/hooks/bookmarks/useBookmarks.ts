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
    { cacheTime: 0, enabled },
  )
}
