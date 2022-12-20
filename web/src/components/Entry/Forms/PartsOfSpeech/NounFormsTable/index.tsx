import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { NounForms } from 'src/graphql/generated'

import { FormsTable } from '../../FormsTable'
import { nounFormsRestructure } from './nounFormsRestructure'

type Props = { forms: NounForms, searched?: string }

export const NounFormsTable = ({ forms, searched }: Props) => {
  const theme = useTheme()
  const formsStructure = nounFormsRestructure(forms) as any
  return (
    <Paper
      sx={{ maxWidth: theme.custom.card.maxWidth, borderRadius: 0 }}
      elevation={0}
    >
      <FormsTable forms={formsStructure} searched={searched} />
    </Paper>
  )
}
