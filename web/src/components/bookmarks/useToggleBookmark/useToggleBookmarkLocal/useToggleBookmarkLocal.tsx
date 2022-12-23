import { Dispatch, SetStateAction } from 'react'

import { useSnackbar } from 'src/hooks/useSnackbar'

import { shouldShowBookmarkInstructions } from '../../BookmarkInstructions'
import { useBookmarkLocal } from './useBookmarkLocal'
import { useUnbookmarkLocal } from './useUnbookmarkLocal'

export const useToggleBookmarkLocal = (
  id: string,
  bookmarked: boolean,
  setBookmarked: Dispatch<SetStateAction<boolean>>
) => {
  const enqueueSnackbar = useSnackbar(true, true)
  const bookmarkLocal = useBookmarkLocal()
  const unbookmarkLocal = useUnbookmarkLocal()
  const toggleBookmark = () => {
    if (!bookmarked) {
      bookmarkLocal(id)
      setBookmarked(true)
    } else {
      unbookmarkLocal(id)
      setBookmarked(false)
    }
    if (shouldShowBookmarkInstructions()) {
      enqueueSnackbar(
        'Your bookmarks are saved locally, sign in to save them across devices/browsers'
      )
    }
  }
  return toggleBookmark
}
