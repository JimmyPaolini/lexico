import React from 'react'

import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'

import { Entry } from 'src/hooks/search/useSearch'

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
    isLatinSearchResult,
  } = entry

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: theme.palette.background.paper,
        maxWidth: theme.custom.card.maxWidth,
        minWidth: theme.custom.card.minWidth,
        paddingBottom: 0,
        ...(isLatinSearchResult
          ? {}
          : { border: `2px solid ${theme.palette.secondary.main}` }),
      }}
    >
      <PrincipalPartsRow
        {...{ id, partOfSpeech, principalParts, inflection, bookmarked }}
      />
      <Divider variant="middle" />
      <TranslationsRow translations={translations || []} />
      <Divider variant="middle" />
      <FormsRow
        partOfSpeech={partOfSpeech}
        forms={forms}
        searched={searched}
        identifiers={identifiers || []}
      />
    </Card>
  )
})
