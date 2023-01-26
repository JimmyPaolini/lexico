import { CardHeader } from '@mui/material'

import { Inflection, Maybe, PrincipalPart } from 'src/graphql/generated'
import { unCamelCase } from 'src/utils/string'

import { PartOfSpeech } from '../../accessories/Icons/PartOfSpeech'
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
      titleTypographyProps={{ variant: 'h5' }}
      subheader={subheader}
      avatar={<PartOfSpeech partOfSpeech={partOfSpeech} />}
      action={<BookmarkButton {...{ id, bookmarked: Boolean(bookmarked) }} />}
      aria-label="Principal Parts and Inflection"
    />
  )
}
