import { useContext, useState } from 'react'

import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { Context } from 'src/components/layout/Context'

import { useIsBookmarkedLocal, useToggleBookmark } from '..'

type Props = { id: string; bookmarked: boolean }

export const BookmarkButton = ({
  id,
  bookmarked: isBookmarkedRemote,
}: Props) => {
  const { user, queryClient } = useContext(Context)
  const isBookmarkedLocal = useIsBookmarkedLocal(id)
  const bookmarkedInitial = user ? isBookmarkedRemote : isBookmarkedLocal
  const [bookmarked, setBookmarked] = useState<boolean>(bookmarkedInitial)

  const toggleBookmark = useToggleBookmark(
    id,
    bookmarked,
    setBookmarked,
    queryClient,
    user
  )

  if (isBookmarkedRemote === undefined) return <></>
  return (
    <IconButton onClick={toggleBookmark} aria-label="Bookmark" size="large">
      {bookmarked ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
  )
}
