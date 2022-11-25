import React, { memo, useState } from 'react'

import {
  Box,
  Collapse,
  Divider,
  Grid,
  ListItem,
  ListItemText,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { Author, Book } from '../../graphql/generated'
import { sentenceCase } from '../../utils/string'
import ExpandIcon from '../accessories/ExpandIcon'
import LiteratureText from './LiteratureText'

const PREFIX = 'LiteratureBook'

const classes = {
  hideHoverHighlight: `${PREFIX}-hideHoverHighlight`,
  inset1: `${PREFIX}-inset1`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.hideHoverHighlight}`]: {
    '&:hover': {
      background: 'inherit',
    },
  },

  [`& .${classes.inset1}`]: {
    marginLeft: theme.spacing(1),
  },
}))

type Props = {
  author: Author
  book: Book
  isLast: boolean
}

export default memo(function LiteratureBook({ book, isLast }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Root>
      <ListItem
        button
        onClick={() => setExpanded((expanded) => !expanded)}
        key={book.id}
        classes={{ button: classes.hideHoverHighlight }}
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
      </ListItem>
      <Collapse in={expanded} mountOnEnter>
        <Grid container justifyContent="center" alignItems="stretch">
          {book.texts.map((text) => (
            <LiteratureText {...{ text }} key={text.id} />
          ))}
        </Grid>
      </Collapse>
      {!isLast ? <Divider className={classes.inset1} /> : null}
    </Root>
  )
})
