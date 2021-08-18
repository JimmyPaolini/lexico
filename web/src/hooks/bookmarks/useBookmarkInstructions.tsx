import { Button } from "@material-ui/core"
import { useRouter } from "next/router"
import { SnackbarKey } from "notistack"
import { useEffect } from "react"
import User from "../../../../entity/user/User"
import { showBookmarkInstructions } from "../../utils/bookmarksLocal"
import useSnackbarEnhanced from "../useSnackbarEnhanced"

export default function useBookmarkInstructions(user?: User): void {
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbarEnhanced()
  useEffect(() => {
    if (!user && showBookmarkInstructions()) {
      const action = (key: SnackbarKey) => (
        <Button
          onClick={() => {
            closeSnackbar(key)
            router.push("/user")
          }}
          color="secondary">
          Sign in
        </Button>
      )
      enqueueSnackbar(
        `Your bookmarks are saved locally, sign in to save them across devices/browsers`,
        {
          autoHideDuration: 10000,
          action,
        },
      )
    }
  }, [])
}
