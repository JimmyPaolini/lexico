import { Dispatch, SetStateAction } from "react"
import { QueryClient } from "react-query"
import useToggleBookmarkRemote from "./useToggleBookmarkRemote"
import { User } from "../../graphql/generated"
import useToggleBookmarkLocal from "./useToggleBookmarkLocal"

export default function useToggleBookmark(
  id: string,
  bookmarked: boolean,
  setBookmarked: Dispatch<SetStateAction<boolean>>,
  queryClient: QueryClient,
  user: User,
) {
  const toggleBookmarkRemote = useToggleBookmarkRemote(
    id,
    bookmarked,
    setBookmarked,
    queryClient,
  )
  const toggleBookmarkLocal = useToggleBookmarkLocal(
    id,
    bookmarked,
    setBookmarked,
  )
  const toggleBookmark = async () => {
    if (user) await toggleBookmarkRemote()
    else toggleBookmarkLocal()
  }
  return toggleBookmark
}
