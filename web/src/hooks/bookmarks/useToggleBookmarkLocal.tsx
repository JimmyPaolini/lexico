import { Dispatch, SetStateAction } from 'react'

import { showBookmarkInstructions } from '../../utils/bookmarkInstructions'
import { bookmarkLocal, unbookmarkLocal } from '../../utils/bookmarksLocal'
import useSnackbarEnhanced from '../useSnackbarEnhanced'

export default function useToggleBookmarkLocal(
  id: string,
  bookmarked: boolean,
  setBookmarked: Dispatch<SetStateAction<boolean>>,
) {
  const { enqueueSnackbar } = useSnackbarEnhanced(true, true)
  const toggleBookmark = async () => {
    if (!bookmarked) {
      bookmarkLocal(id)
      setBookmarked(true)
    } else {
      unbookmarkLocal(id)
      setBookmarked(false)
    }
    if (showBookmarkInstructions()) {
      enqueueSnackbar(
        `Your bookmarks are saved locally, sign in to save them across devices/browsers`,
      )
    }
  }
  return toggleBookmark
}
