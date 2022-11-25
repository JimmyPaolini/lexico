import React, { useState } from 'react'

import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { AdjectiveForms } from 'src/graphql/generated'
import { Gender } from 'src/utils/identifiers'

import FormTabs from '../../FormTabs'
import FormsTable from '../../FormsTable'
import { adjectiveFormsRestructure } from './adjectiveFormsRestructure'

type Props = { forms: AdjectiveForms; searched: string }

export default function AdjectiveFormsTable({ forms, searched }: Props) {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const structure = adjectiveFormsRestructure(forms)
  const tabs = Object.keys(structure) as Gender[]
  const formsStructure = structure[tabs[activeTab]]
  return (
    <Paper
      sx={{ maxWidth: theme.custom.card.maxWidth, borderRadius: 0 }}
      elevation={0}
    >
      <FormTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <FormsTable forms={formsStructure} searched={searched} />
      </FormTabs>
    </Paper>
  )
}
