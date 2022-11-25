import { useEffect } from 'react'

import { User } from '../../graphql/generated'
import { showBookmarkInstructions } from '../../utils/bookmarkInstructions'
import useSnackbarEnhanced from '../useSnackbarEnhanced'

export default function useBookmarkInstructions(user?: User): void {
  const { enqueueSnackbar } = useSnackbarEnhanced(true, true)
  useEffect(() => {
    if (!user && showBookmarkInstructions()) {
      enqueueSnackbar(
        `Your bookmarks are saved locally, sign in to save them across devices/browsers`,
      )
    }
  }, [])
}
