import React from 'react'

import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'

import { Entry } from '../../graphql/generated'
import FormsRow from './FormsRow/FormsRow'
import PrincipalPartsRow from './PrincipalPartsRow/PrincipalPartsRow'
import TranslationsRow from './TranslationsRow/TranslationsRow'

type Props = { entry: Entry; searched: string }

export default (function EntryCard({ entry, searched = '' }: Props) {
  const theme = useTheme()
  const {
    id,
    partOfSpeech,
    principalParts,
    inflection,
    bookmarked,
    translations,
    forms,
    identifiers,
  } = entry

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: theme.custom.card.maxWidth,
        minWidth: theme.custom.card.minWidth,
        paddingBottom: 0,
      }}
    >
      <PrincipalPartsRow
        {...{ id, partOfSpeech, principalParts, inflection, bookmarked }}
      />
      <Divider variant="inset" />
      <TranslationsRow translations={translations || []} />
      <FormsRow
        partOfSpeech={partOfSpeech}
        forms={forms}
        searched={searched}
        identifiers={identifiers || []}
      />
    </Card>
  )
})
