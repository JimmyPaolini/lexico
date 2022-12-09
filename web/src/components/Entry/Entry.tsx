import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'

import { Entry as EntryType } from 'src/hooks/search/useSearch'

import { Forms } from './Forms/Forms'
import { PrincipalParts } from './PrincipalParts/PrincipalParts'
import { Translations } from './Translations/Translations'

type Props = { entry: EntryType; searched: string }

export const Entry = ({ entry, searched = '' }: Props) => {
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
        background: theme.palette.background.paper,
        maxWidth: theme.custom.card.maxWidth,
        minWidth: theme.custom.card.minWidth,
        width: '100%',
        paddingBottom: 0,
        border:
          isLatinSearchResult === false
            ? `2px solid ${theme.palette.secondary.main}`
            : undefined,
      }}
    >
      <PrincipalParts
        {...{ id, partOfSpeech, principalParts, inflection, bookmarked }}
      />
      <Divider variant="middle" />
      <Translations translations={translations || []} />
      <Divider variant="middle" />
      <Forms
        partOfSpeech={partOfSpeech}
        forms={forms}
        searched={searched}
        identifiers={identifiers || []}
      />
    </Card>
  )
}