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

import { ExpandIcon } from '../../accessories/ExpandIcon'
import { useAuthorSummary } from './useAuthorSummary'

type Props = {
  author: Author
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}
export const LibraryAuthor = ({ author, expanded, setExpanded }: Props) => {
  const summary = useAuthorSummary(author)

  return (
    <CardActionArea
      onClick={() => setExpanded((expanded) => !expanded)}
      sx={{ '&.MuiFocusHighlight': { display: 'none' } }}
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
