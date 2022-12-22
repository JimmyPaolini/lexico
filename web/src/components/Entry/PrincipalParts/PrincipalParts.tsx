import { Box, CardHeader } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Inflection, Maybe, PrincipalPart } from 'src/graphql/generated'
import { unCamelCase } from 'src/utils/string'

import { ExpandIcon } from '../../accessories/ExpandIcon'
import { BookmarkButton } from './BookmarkButton'
import { inflectionToString } from './inflectionToString'

type Props = {
  id: string
  partOfSpeech: string
  principalParts: Maybe<PrincipalPart[]> | undefined
  inflection: Inflection | null | undefined
  bookmarked?: Maybe<boolean>
  expanded?: boolean
}

export const PrincipalParts = ({
  id,
  partOfSpeech,
  principalParts,
  inflection,
  bookmarked,
  expanded,
}: Props) => {
  const theme = useTheme()
  const principalPartsFormatted = principalParts
    ?.map((principalPart) => principalPart.text.join('/'))
    .join(', ')

  const subheader = `${unCamelCase(partOfSpeech)}, ${inflectionToString(
    inflection,
    partOfSpeech
  )}`.replace(/, ?$|^, ?/, '')

  return (
    <CardHeader
      title={principalPartsFormatted}
      titleTypographyProps={{ variant: 'subtitle1' }}
      subheader={subheader}
      subheaderTypographyProps={{ variant: 'subtitle2' }}
      aria-label="Principal Parts, Inflection, and Bookmark toggle"
      action={
        expanded === undefined ? (
          <BookmarkButton {...{ id, bookmarked }} />
        ) : (
          <Box
            sx={{
              marginTop: theme.spacing(2.5),
              marginRight: theme.spacing(1.5),
            }}
          >
            <ExpandIcon expanded={expanded} />
          </Box>
        )
      }
    />
  )
}
