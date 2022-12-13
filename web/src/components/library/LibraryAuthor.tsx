import { Dispatch, SetStateAction } from 'react'

import {
  Box,
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Typography,
} from '@mui/material'

import { Author } from 'src/graphql/generated'
import { sentenceCase } from 'src/utils/string'

import { ExpandIcon } from '../accessories/ExpandIcon'

type Props = {
  author: Author
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}
export const LibraryAuthor = ({ author, expanded, setExpanded }: Props) => {
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
    <CardActionArea
      onClick={() => setExpanded((expanded) => !expanded)}
      sx={{
        '&.MuiFocusHighlight': {
          display: 'none',
        },
      }}
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
                sx={{
                  display: 'block',
                  lineHeight: 1.3,
                  marginTop: '4px',
                }}
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
    </CardActionArea>
  )
}
