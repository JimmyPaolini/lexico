import { useEffect } from 'react'

import { User } from 'src/graphql/generated'
import { showBookmarkInstructions } from 'src/utils/bookmarkInstructions'

import { useSnackbarEnhanced } from '../useSnackbarEnhanced'

export const useBookmarkInstructions = (user?: User): void => {
  const { enqueueSnackbar } = useSnackbarEnhanced(true, true)
  useEffect(() => {
    if (!user && showBookmarkInstructions()) {
      enqueueSnackbar(
        `Your bookmarks are saved locally, sign in to save them across devices/browsers`,
      )
    }
  }, [])
}
