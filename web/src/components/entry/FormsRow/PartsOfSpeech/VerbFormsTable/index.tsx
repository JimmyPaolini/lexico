/* spellchecker: disable */
import React, { useState } from 'react'

import { Box, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Forms, Maybe } from '../../../../../graphql/generated'
import FormTabs from '../../FormTabs'
import FormsTable from '../../FormsTable'
import { verbFormsRestructure } from './verbFormsRestructure'

const PREFIX = 'index'

const classes = {
  paper: `${PREFIX}-paper`,
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  [`&.${classes.paper}`]: {
    maxWidth: theme.custom.cardWidth,
    borderRadius: 0,
  },
}))

type Props = {
  forms?: Maybe<Forms>
}

export default function VerbForms({ forms }: Props) {
  const [topTab, setTopTabState] = useState(0)
  const [midTab, setMidTabState] = useState(0)
  const [bottomTab, setBottomTab] = useState(0)

  const structure = verbFormsRestructure(forms)
  const topTabs = Object.keys(structure)
  let midTabs = Object.keys(structure?.[topTabs[topTab]] || { '-': '' })
  let bottomTabs = Object.keys(
    structure?.[topTabs[topTab]]?.[midTabs[midTab]] || { '-': '' },
  )

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
    <StyledPaper className={classes.paper} elevation={0}>
      <FormTabs tabs={topTabs} activeTab={topTab} setActiveTab={setTopTab}>
        <FormTabs tabs={midTabs} activeTab={midTab} setActiveTab={setMidTab}>
          <FormTabs
            tabs={bottomTabs}
            activeTab={bottomTab}
            setActiveTab={setBottomTab}
          >
            <Box style={{ height: '8px' }} />
            <FormsTable forms={formsStructure} />
          </FormTabs>
        </FormTabs>
      </FormTabs>
    </StyledPaper>
  )
}
