import React, { useContext, useState } from 'react'

import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Bookmark, BookmarkBorder } from '@material-ui/icons'

import { Maybe } from '../../../graphql/generated'
import useToggleBookmark from '../../../hooks/bookmarks/useToggleBookmark'
import { isBookmarkedLocal } from '../../../utils/bookmarksLocal'
import { Context } from '../../layout/Context'

type Props = {
  id: string
  bookmarked?: Maybe<boolean>
}
export default function PrincipalPartsRow({
  id,
  bookmarked: bookmarkedOriginal,
}: Props) {
  const classes = useStyles()
  const { user, queryClient } = useContext(Context)

  const bookmarkedInitial = user ? !!bookmarkedOriginal : isBookmarkedLocal(id)
  const [bookmarked, setBookmarked] = useState<boolean>(bookmarkedInitial)

  const toggleBookmark = useToggleBookmark(
    id,
    bookmarked,
    setBookmarked,
    queryClient,
    user,
  )

  if (bookmarkedOriginal === undefined) return <></>
  return (
    <IconButton
      onClick={toggleBookmark}
      className={classes.bookmark}
      aria-label="Bookmark"
    >
      {bookmarked ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
  )
}

const useStyles = makeStyles(() => ({
  bookmark: {
    display: 'inline-block',
    position: 'relative',
    top: 8,
  },
}))
