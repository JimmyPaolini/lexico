import React, { memo } from 'react'

import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'

import { Entry } from '../../graphql/generated'
import FormsRow from './FormsRow/FormsRow'
import PrincipalPartsRow from './PrincipalPartsRow/PrincipalPartsRow'
import TranslationsRow from './TranslationsRow/TranslationsRow'

const PREFIX = 'EntryCard'

const classes = {
  entryCard: `${PREFIX}-entryCard`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.entryCard}`]: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.custom.cardWidth,
    minWidth: theme.custom.cardWidth - parseInt(theme.spacing(4)),
    paddingBottom: 0,
    margin: theme.spacing(1),
  },
}))

type Props = {
  entry: Entry
  searched: string
}
export default memo(function EntryCard({ entry, searched = '' }: Props) {
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
    <StyledCard elevation={4} className={classes.entryCard}>
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
    </StyledCard>
  )
})
