import { CardHeader } from '@mui/material'

import {
  Inflection,
  Maybe,
  NounInflection,
  PrepositionInflection,
  PrincipalPart,
} from 'src/graphql/generated'
import { unCamelCase } from 'src/utils/string'

import { Identifier } from '../../../utils/identifiers'
import { PartOfSpeech } from '../../accessories/Icons/PartOfSpeech'
import { IdentifierPill } from '../../accessories/Pills/IdentifierPill'
import { PillVariant } from '../../accessories/Pills/Pill'
import { BookmarkButton } from '../../bookmarks/BookmarkButton'
import { inflectionToString } from './inflectionToString'

type Props = {
  id: string
  partOfSpeech: string
  principalParts: Maybe<PrincipalPart[]> | undefined
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
      titleTypographyProps={{ variant: 'body1' }}
      subheader={subheader}
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
