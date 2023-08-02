/* spellchecker: disable */
import { useState } from 'react'

import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { VerbForms } from 'src/graphql/generated'
import { Identifier } from 'src/utils/identifiers'

import { FormTabs } from '../../FormTabs'
import { FormsTable } from '../../FormsTable'
import { verbFormsRestructure } from './verbFormsRestructure'

type Props = { forms: VerbForms; search?: string }

export const VerbFormsTable = ({ forms, search }: Props) => {
  const theme = useTheme()
  const [topTab, setTopTabState] = useState(0)
  const [midTab, setMidTabState] = useState(0)
  const [bottomTab, setBottomTab] = useState(0)

  const structure = verbFormsRestructure(forms) as any
  const topTabs = Object.keys(structure)
  let midTabs = Object.keys(structure[topTabs[topTab]])
  let bottomTabs = Object.keys(structure[topTabs[topTab]][midTabs[midTab]])

  const setTopTab = (newTopTab: number) => {
    const oldBottomTab = bottomTabs[bottomTab]
    const oldMidTab = midTabs[midTab]

    setTopTabState(newTopTab)

    midTabs = Object.keys(structure?.[topTabs[newTopTab]] || { '-': '' })
    const newMidTab = midTabs.includes(oldMidTab)
      ? midTabs.indexOf(oldMidTab)
      : 0
    setMidTabState(midTabs.includes(oldMidTab) ? midTabs.indexOf(oldMidTab) : 0)

    bottomTabs = Object.keys(
      structure?.[topTabs[newTopTab]]?.[midTabs[newMidTab]] || { '-': '' }
    )
    setBottomTab(
      bottomTabs.includes(oldBottomTab) ? bottomTabs.indexOf(oldBottomTab) : 0
    )
  }

  const setMidTab = (newMidTab: number) => {
    const oldBottomTab = bottomTabs[bottomTab]

    setMidTabState(newMidTab)

    bottomTabs = Object.keys(
      structure?.[topTabs[topTab]]?.[midTabs[newMidTab]] || { '-': '' }
    )
    setBottomTab(
      bottomTabs.includes(oldBottomTab) ? bottomTabs.indexOf(oldBottomTab) : 0
    )
  }

  const formsStructure =
    structure[topTabs[topTab]][midTabs[midTab]][bottomTabs[bottomTab]]

  return (
    <Paper
      sx={{ maxWidth: theme.custom.card.maxWidth, borderRadius: 0 }}
      elevation={0}
    >
      <FormTabs
        tabs={topTabs as Identifier[]}
        activeTab={topTab}
        setActiveTab={setTopTab}
      >
        <FormTabs
          tabs={midTabs as Identifier[]}
          activeTab={midTab}
          setActiveTab={setMidTab}
        >
          <FormTabs
            tabs={bottomTabs as Identifier[]}
            activeTab={bottomTab}
            setActiveTab={setBottomTab}
          >
            <FormsTable forms={formsStructure} search={search} />
          </FormTabs>
        </FormTabs>
      </FormTabs>
    </Paper>
  )
}
