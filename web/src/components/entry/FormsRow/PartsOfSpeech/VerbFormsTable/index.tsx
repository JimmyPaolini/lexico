/* spellchecker: disable */
import React, { useState } from 'react'

import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Identifier } from 'src/utils/identifiers'

import { Forms, Maybe } from '../../../../../graphql/generated'
import FormTabs from '../../FormTabs'
import FormsTable from '../../FormsTable'
import { verbFormsRestructure } from './verbFormsRestructure'

type Props = { forms?: Maybe<Forms> }

export default function VerbForms({ forms }: Props) {
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
    const newMidTab =
      midTabs.indexOf(oldMidTab) !== -1 ? midTabs.indexOf(oldMidTab) : 0
    setMidTabState(
      midTabs.indexOf(oldMidTab) !== -1 ? midTabs.indexOf(oldMidTab) : 0,
    )

    bottomTabs = Object.keys(
      structure?.[topTabs[newTopTab]]?.[midTabs[newMidTab]] || { '-': '' },
    )
    setBottomTab(
      bottomTabs.indexOf(oldBottomTab) !== -1
        ? bottomTabs.indexOf(oldBottomTab)
        : 0,
    )
  }

  const setMidTab = (newMidTab: number) => {
    const oldBottomTab = bottomTabs[bottomTab]

    setMidTabState(newMidTab)

    bottomTabs = Object.keys(
      structure?.[topTabs[topTab]]?.[midTabs[newMidTab]] || { '-': '' },
    )
    setBottomTab(
      bottomTabs.indexOf(oldBottomTab) !== -1
        ? bottomTabs.indexOf(oldBottomTab)
        : 0,
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
            <FormsTable forms={formsStructure} />
          </FormTabs>
        </FormTabs>
      </FormTabs>
    </Paper>
  )
}
