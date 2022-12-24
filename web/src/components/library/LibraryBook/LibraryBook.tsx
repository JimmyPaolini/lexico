import { useMemo, useState } from 'react'

import { Box, Collapse, ListItemButton, ListItemText } from '@mui/material'

import { Author, Book } from 'src/graphql/generated'
import { sentenceCase } from 'src/utils/string'

import { ExpandIcon } from '../../accessories/ExpandIcon'
import { LibraryTexts } from '../LibraryTexts'

type Props = { author: Author; book: Book }

export const LibraryBook = ({ book }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const title = useMemo(
    () => sentenceCase(book.title).replace(/^\d+ /, ''),
    [book]
  )

  return (
    <>
      <ListItemButton
        disableRipple
        disableTouchRipple
        onClick={() => setExpanded((expanded) => !expanded)}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{ variant: 'body1' }}
        />
        <Box py="auto" mr={0.5} display="flex">
          <ExpandIcon expanded={expanded} />
        </Box>
      </ListItemButton>
      <Collapse in={expanded}>
        <LibraryTexts texts={book.texts} />
      </Collapse>
    </>
  )
}
