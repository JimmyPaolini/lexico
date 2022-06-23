import { Dispatch, SetStateAction } from 'react'

import { Button } from '@mui/material'

import { useRouter } from 'next/router'
import { SnackbarKey } from 'notistack'

import { showBookmarkInstructions } from '../../utils/bookmarkInstructions'
import { bookmarkLocal, unbookmarkLocal } from '../../utils/bookmarksLocal'
import useSnackbarEnhanced from '../useSnackbarEnhanced'

export default function useToggleBookmarkLocal(
  id: string,
  bookmarked: boolean,
  setBookmarked: Dispatch<SetStateAction<boolean>>,
) {
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbarEnhanced()
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
        {
          action: (key: SnackbarKey) => (
            <Button
              onClick={() => {
                closeSnackbar(key)
                router.push('/user')
              }}
              color="secondary"
            >
              Sign in
            </Button>
          ),
        },
      )
    }
  }
  return toggleBookmark
}
