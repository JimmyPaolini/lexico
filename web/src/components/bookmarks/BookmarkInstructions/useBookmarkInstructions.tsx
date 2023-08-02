import { useEffect } from 'react'

import { User } from 'src/graphql/generated'

import { useSnackbar } from '../../../hooks/useSnackbar'
import { shouldShowBookmarkInstructions } from './showBookmarkInstructions'

export const useBookmarkInstructions = (user?: User): void => {
  const enqueueSnackbar = useSnackbar(true, true)
  useEffect(() => {
    if (!user && shouldShowBookmarkInstructions()) {
      enqueueSnackbar(
        'Your bookmarks are saved locally, sign in to save them across devices/browsers'
      )
    }
  }, [])
}
