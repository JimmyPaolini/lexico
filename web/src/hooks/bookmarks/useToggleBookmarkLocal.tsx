import { Dispatch, SetStateAction } from 'react'

import { showBookmarkInstructions } from 'src/utils/bookmarkInstructions'
import { bookmarkLocal, unbookmarkLocal } from 'src/utils/bookmarksLocal'

import { useSnackbar } from '../useSnackbar'

export const useToggleBookmarkLocal = (
  id: string,
  bookmarked: boolean,
  setBookmarked: Dispatch<SetStateAction<boolean>>,
) => {
  const enqueueSnackbar = useSnackbar(true, true)
  const toggleBookmark = () => {
    if (!bookmarked) {
      bookmarkLocal(id)
      setBookmarked(true)
    } else {
      unbookmarkLocal(id)
      setBookmarked(false)
    }
    if (showBookmarkInstructions()) {
      enqueueSnackbar(
        'Your bookmarks are saved locally, sign in to save them across devices/browsers',
      )
    }
  }
  return toggleBookmark
}
