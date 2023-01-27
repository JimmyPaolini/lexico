import { ComponentProps, useState } from 'react'

import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { AdjectiveForms } from 'src/graphql/generated'
import { Gender } from 'src/utils/identifiers'

import { Form } from '../../Form/Form'
import { FormTabs } from '../../FormTabs'
import { FormsTable } from '../../FormsTable'
import { adjectiveFormsRestructure } from './adjectiveFormsRestructure'

type Props = { forms: AdjectiveForms; search?: string }

export const AdjectiveFormsTable = ({ forms, search }: Props) => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const structure = adjectiveFormsRestructure(forms)
  const tabs = Object.keys(structure) as Gender[]
  const formsStructure = structure[tabs[activeTab]] as ComponentProps<
    typeof Form
  >[]
  return (
    <Paper
      sx={{ maxWidth: theme.custom.card.maxWidth, borderRadius: 0 }}
      elevation={0}
    >
      <FormTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <FormsTable forms={formsStructure} search={search} />
      </FormTabs>
    </Paper>
  )
}
