import { Dispatch, SetStateAction } from 'react'

import { useSnackbar } from 'src/hooks/useSnackbar'

import { shouldShowBookmarkInstructions } from '../../BookmarkInstructions'
import { createBookmarkLocal } from './createBookmarkLocal'
import { deleteBookmarkLocal } from './deleteBookmarkLocal'

export const useToggleBookmarkLocal = (
  id: string,
  bookmarked: boolean,
  setBookmarked: Dispatch<SetStateAction<boolean>>
) => {
  const enqueueSnackbar = useSnackbar(true, true)
  const toggleBookmark = () => {
    if (!bookmarked) {
      createBookmarkLocal(id)
      setBookmarked(true)
    } else {
      deleteBookmarkLocal(id)
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
