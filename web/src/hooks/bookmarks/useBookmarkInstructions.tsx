import { useEffect } from 'react'

import { Button } from '@material-ui/core'

import { useRouter } from 'next/router'
import { SnackbarKey } from 'notistack'

import { User } from '../../graphql/generated'
import { showBookmarkInstructions } from '../../utils/bookmarkInstructions'
import useSnackbarEnhanced from '../useSnackbarEnhanced'

export default function useBookmarkInstructions(user?: User): void {
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbarEnhanced()
  useEffect(() => {
    if (!user && showBookmarkInstructions()) {
      const action = (key: SnackbarKey) => (
        <Button
          onClick={() => {
            closeSnackbar(key)
            router.push('/user')
          }}
          color="secondary"
        >
          Sign in
        </Button>
      )
      enqueueSnackbar(
        `Your bookmarks are saved locally, sign in to save them across devices/browsers`,
        { autoHideDuration: 10000, action },
      )
    }
  }, [])
}
