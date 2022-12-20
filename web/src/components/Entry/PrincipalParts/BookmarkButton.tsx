import { useContext, useState } from 'react'

import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { Maybe } from 'src/graphql/generated'
import { useToggleBookmark } from 'src/hooks/bookmarks/useToggleBookmark'
import { isBookmarkedLocal } from 'src/utils/bookmarksLocal'

import { Context } from '../../layout/Context'

type Props = { id: string, bookmarked?: Maybe<boolean> }

export const BookmarkButton = ({ id, bookmarked: bookmarkedRemote }: Props) => {
  const { user, queryClient } = useContext(Context)
  const bookmarkedInitial = user ? !!bookmarkedRemote : isBookmarkedLocal(id)
  const [bookmarked, setBookmarked] = useState<boolean>(bookmarkedInitial)

  const toggleBookmark = useToggleBookmark(
    id,
    bookmarked,
    setBookmarked,
    queryClient,
    user,
  )

  if (bookmarkedRemote === undefined) return <></>
  return (
    <IconButton onClick={toggleBookmark} aria-label="Bookmark" size="large">
      {bookmarked ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
  )
}
