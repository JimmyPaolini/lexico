import { Dispatch, SetStateAction, memo } from 'react'

import {
  Box,
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { Author } from 'src/graphql/generated'
import { sentenceCase } from 'src/utils/string'

import { ExpandIcon } from '../accessories/ExpandIcon'

const PREFIX = 'LiteratureAuthor'

const classes = {
  summary: `${PREFIX}-summary`,
  none: `${PREFIX}-none`,
}

const StyledCardActionArea = styled(CardActionArea)(() => ({
  [`& .${classes.summary}`]: {
    display: 'block',
    lineHeight: 1.3,
    marginTop: 4,
  },

  [`& .${classes.none}`]: {
    display: 'none',
  },
}))

type Props = {
  author: Author
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}
export const LiteratureAuthor = memo(function LiteratureAuthor({
  author,
  expanded,
  setExpanded,
}: Props) {
  let summary = [
    ...(author.books || []),
    ...author.texts.filter(
      (text) =>
        !(author.books || []).some((book) =>
          book.texts.some((bookText) => bookText.id === text.id),
        ),
    ),
  ]
    .sort()
    .map((item) => sentenceCase(item.title).replace(/^\d+ /, ''))
    .join(' • ')
  if (author.id === 'catullus') summary = 'Carmina 1-116'

  return (
    <StyledCardActionArea
      onClick={() => setExpanded((expanded) => !expanded)}
      classes={{ focusHighlight: classes.none }}
      disableRipple
      disableTouchRipple
    >
      <CardHeaderMui
        title={sentenceCase(author.id)}
        subheader={
          <>
            <Typography variant="body1" color="textSecondary">
              {sentenceCase(author.name)}
            </Typography>
            <Collapse in={!expanded}>
              <Typography
                variant="caption"
                color="textPrimary"
                className={classes.summary}
              >
                {summary}
              </Typography>
            </Collapse>
          </>
        }
        action={
          <Box mt={1.5} mr={1.5}>
            <ExpandIcon {...{ expanded }} />
          </Box>
        }
      />
    </StyledCardActionArea>
  )
})
