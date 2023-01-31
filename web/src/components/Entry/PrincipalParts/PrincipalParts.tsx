import { CardHeader } from '@mui/material'

import {
  Inflection,
  Maybe,
  NounInflection,
  PrepositionInflection,
  PrincipalPart,
} from 'src/graphql/generated'

import {
  Identifier,
  PartOfSpeech as PartOfSpeechType,
} from '../../../utils/identifiers'
import { PartOfSpeech } from '../../accessories/Icons/PartOfSpeech'
import { IdentifierPill } from '../../accessories/Pills/IdentifierPill'
import { PillVariant } from '../../accessories/Pills/Pill'
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
          <PartOfSpeech partOfSpeech={partOfSpeech} />
          {partOfSpeech === 'noun' && (
            <IdentifierPill
              identifier={(inflection as NounInflection).gender as Identifier}
              variant={PillVariant.SMALL}
            />
          )}
          {partOfSpeech === 'preposition' && (
            <IdentifierPill
              identifier={
                (inflection as PrepositionInflection).case as Identifier
              }
              variant={PillVariant.SMALL}
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
