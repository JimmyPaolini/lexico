import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'

import { Entry as EntryType } from 'src/components/search/useSearch'

import { Forms } from './Forms/Forms'
import { PrincipalParts } from './PrincipalParts/PrincipalParts'
import { Translations } from './Translations/Translations'

type Props = { entry: EntryType; search: string }

export const Entry = ({ entry, search = '' }: Props) => {
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
        borderTop:
          isLatinSearchResult === false
            ? `4px solid ${theme.palette.secondary.main}`
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
        search={search}
        identifiers={identifiers || []}
      />
    </Card>
  )
}
