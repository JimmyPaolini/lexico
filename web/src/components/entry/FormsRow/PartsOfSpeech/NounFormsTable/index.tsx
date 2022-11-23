/* spellchecker: disable */
import React from 'react'

import { Box, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { NounForms } from 'src/graphql/generated'

import FormsTable from '../../FormsTable'
import { nounFormsRestructure } from './nounFormsRestructure'

type Props = { forms: NounForms }

export default function NounFormsTable({ forms }: Props) {
  const theme = useTheme()
  const formsStructure = nounFormsRestructure(forms)
  return (
    <Paper
      sx={{ maxWidth: theme.custom.card.maxWidth, borderRadius: 0 }}
      elevation={0}
    >
      <Box style={{ height: '4px' }} />
      <FormsTable forms={formsStructure} />
    </Paper>
  )
}
