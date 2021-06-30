import { Button, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Bookmark, BookmarkBorder } from "@material-ui/icons"
import { useRouter } from "next/router"
import { SnackbarKey } from "notistack"
import React, { useContext, useState } from "react"
import useBookmark from "../../../hooks/bookmarks/useBookmark"
import useUnbookmark from "../../../hooks/bookmarks/useUnbookmark"
import useSnackbarEnhanced from "../../../hooks/useSnackbarEnhanced"
import {
  bookmarkLocal,
  isBookmarkedLocal,
  showBookmarkInstructions,
  unbookmarkLocal,
} from "../../../utils/localBookmarks"
import { Context } from "../../layout/Context"

interface Props {
  id: string
  bookmarked?: boolean
}
export default function PrincipalPartsRow({
  id,
  bookmarked: bookmarkedOriginal,
}: Props): JSX.Element {
  const classes = useStyles()
  const { user } = useContext(Context)

  const bookmarkedInitial = user ? !!bookmarkedOriginal : isBookmarkedLocal(id)
  const [bookmarked, setBookmarked] = useState<boolean>(bookmarkedInitial)

  const { mutateAsync: bookmark } = useBookmark(setBookmarked)
  const { mutateAsync: unbookmark } = useUnbookmark(setBookmarked)

  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbarEnhanced()
  const toggleBookmark = async () => {
    if (user) {
      if (!bookmarked) await bookmark(id)
      else await unbookmark(id)
    } else {
      if (!bookmarked) {
        bookmarkLocal(id)
        setBookmarked(true)
      } else {
        unbookmarkLocal(id)
        setBookmarked(false)
      }
      if (showBookmarkInstructions()) {
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
          { action },
        )
      }
    }
  }

  if (bookmarkedOriginal === undefined) return <></>
  return (
    <IconButton
      onClick={toggleBookmark}
      className={classes.bookmark}
      aria-label="Bookmark">
      {bookmarked ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
  )
}

const useStyles = makeStyles(() => ({
  bookmark: {
    display: "inline-block",
    position: "relative",
    top: 8,
  },
}))
