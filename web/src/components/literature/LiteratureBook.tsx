import { useState } from 'react'

import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Author, Book } from 'src/graphql/generated'
import { sentenceCase } from 'src/utils/string'

import { ExpandIcon } from '../accessories/ExpandIcon'
import { LiteratureText } from './LiteratureText'

type Props = { author: Author; book: Book; isLast: boolean }

export const LiteratureBook = ({ book, isLast }: Props) => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <>
      <ListItemButton
        onClick={() => setExpanded((expanded) => !expanded)}
        sx={{ '&:hover': { background: 'inherit' } }}
        disableRipple
        disableTouchRipple
      >
        <ListItemText
          primary={sentenceCase(book.title).replace(/^\d+ /, '')}
          primaryTypographyProps={{ variant: 'body1' }}
        />
        <Box py="auto" mr={0.5} display="flex">
          <ExpandIcon expanded={expanded} />
        </Box>
      </ListItemButton>
      <Collapse in={expanded} mountOnEnter>
        <Grid container justifyContent="center" alignItems="stretch">
          {book.texts.map((text) => (
            <LiteratureText {...{ text }} key={text.id} />
          ))}
        </Grid>
      </Collapse>
      {!isLast ? (
        <Divider
          sx={{
            marginLeft: theme.spacing(1),
          }}
        />
      ) : null}
    </>
  )
}
