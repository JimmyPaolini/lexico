import { Dispatch, SetStateAction } from 'react'

import { QueryClient } from 'react-query'

import { useBookmarkRemote } from './useBookmarkRemote'
import { useUnbookmarkRemote } from './useUnbookmarkRemote'

export const useToggleBookmarkRemote = (
  id: string,
  bookmarked: boolean,
  setBookmarked: Dispatch<SetStateAction<boolean>>,
  queryClient: QueryClient
) => {
  const bookmarkRemote = useBookmarkRemote(queryClient, setBookmarked)
  const unbookmarkRemote = useUnbookmarkRemote(queryClient, setBookmarked)
  const toggleBookmarkRemote = async () => {
    if (!bookmarked) await bookmarkRemote({ entryId: id })
    else await unbookmarkRemote({ entryId: id })
  }
  return toggleBookmarkRemote
}
