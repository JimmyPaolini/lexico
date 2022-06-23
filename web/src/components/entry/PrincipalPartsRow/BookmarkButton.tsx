import React, { useContext, useState } from 'react'

import { styled } from '@mui/material/styles';

import { IconButton } from '@mui/material'
import { Bookmark, BookmarkBorder } from '@mui/icons-material'

import { Maybe } from '../../../graphql/generated'
import useToggleBookmark from '../../../hooks/bookmarks/useToggleBookmark'
import { isBookmarkedLocal } from '../../../utils/bookmarksLocal'
import { Context } from '../../layout/Context'

const PREFIX = 'BookmarkButton';

const classes = {
  bookmark: `${PREFIX}-bookmark`
};

const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.bookmark}`]: {
    display: 'inline-block',
    position: 'relative',
    top: 8,
  }
}));

type Props = {
  id: string
  bookmarked?: Maybe<boolean>
}

export default function PrincipalPartsRow({
  id,
  bookmarked: bookmarkedOriginal,
}: Props) {

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
    <StyledIconButton
      onClick={toggleBookmark}
      className={classes.bookmark}
      aria-label="Bookmark"
      size="large">
      {bookmarked ? <Bookmark /> : <BookmarkBorder />}
    </StyledIconButton>
  );
}
