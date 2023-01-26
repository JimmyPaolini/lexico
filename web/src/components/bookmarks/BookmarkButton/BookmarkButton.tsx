import { useState } from 'react'

import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useLexicoContext } from 'src/components/layout/LexicoContext'

import { isBookmarkedLocal, useToggleBookmark } from '..'

type Props = { id: string; bookmarked: boolean }

export const BookmarkButton = ({
  id,
  bookmarked: isBookmarkedRemote,
}: Props) => {
  const { user, queryClient } = useLexicoContext()
  const bookmarkedInitial = user ? isBookmarkedRemote : isBookmarkedLocal(id)
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
