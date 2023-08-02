import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { NounForms } from 'src/graphql/generated'

import { FormsTable } from '../../FormsTable'
import { nounFormsRestructure } from './nounFormsRestructure'

type Props = { forms: NounForms; search?: string }

export const NounFormsTable = ({ forms, search }: Props) => {
  const theme = useTheme()
  const formsStructure = nounFormsRestructure(forms)
  return (
    <Paper
      sx={{ maxWidth: theme.custom.card.maxWidth, borderRadius: 0 }}
      elevation={0}
    >
      <FormsTable forms={formsStructure} search={search} />
    </Paper>
  )
}
