import { CardHeader } from '@mui/material'

import {
  Identifier,
  IdentifierType,
} from 'src/components/accessories/Identifier'
import {
  Inflection,
  Maybe,
  NounInflection,
  PrepositionInflection,
  PrincipalPart,
} from 'src/graphql/generated'

import { PartOfSpeech as PartOfSpeechType } from '../../../utils/identifiers'
import { BookmarkButton } from '../../bookmarks/BookmarkButton'
import {
  getInflectionLabel,
  getPrincipalPartsLabel,
} from './PrincipalParts.hooks'

type Props = {
  id: string
  partOfSpeech: PartOfSpeechType
  principalParts: PrincipalPart[]
  inflection: Inflection | null | undefined
  bookmarked?: Maybe<boolean>
}

export const PrincipalParts = ({
  id,
  partOfSpeech,
  principalParts,
  inflection,
  bookmarked,
}: Props) => {
  const principalPartsLabel = getPrincipalPartsLabel(principalParts ?? [])
  const inflectionLabel = getInflectionLabel(inflection, partOfSpeech)

  return (
    <CardHeader
      title={principalPartsLabel}
      titleTypographyProps={{ variant: 'body1' }}
      subheader={inflectionLabel}
      avatar={
        <>
          <Identifier identifier={partOfSpeech} />
          {partOfSpeech === 'noun' && (
            <Identifier
              identifier={
                (inflection as NounInflection).gender as IdentifierType
              }
            />
          )}
          {partOfSpeech === 'preposition' && (
            <Identifier
              identifier={
                (inflection as PrepositionInflection).case as IdentifierType
              }
            />
          )}
        </>
      }
      sx={{
        '& .MuiCardHeader-avatar': {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
      action={<BookmarkButton {...{ id, bookmarked: Boolean(bookmarked) }} />}
      aria-label="Principal Parts and Inflection"
    />
  )
}
