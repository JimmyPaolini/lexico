/* spellchecker: disable */
import React, { useState } from 'react'

import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Forms, Maybe } from '../../../../../graphql/generated'
import FormTabs from '../../FormTabs'
import FormsTable from '../../FormsTable'
import { adjectiveFormsRestructure } from './adjectiveFormsRestructure'

const PREFIX = 'index'

const classes = {
  paper: `${PREFIX}-paper`,
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  [`&.${classes.paper}`]: {
    maxWidth: theme.custom.card.maxWidth,
    borderRadius: 0,
  },
}))

type Props = {
  forms?: Maybe<Forms>
}

export default function AdjectiveForms({ forms }: Props) {
  const [tab, setTab] = useState(0)
  const structure = adjectiveFormsRestructure(forms)
  const tabs = Object.keys(structure)
  const formsStructure = structure[tabs[tab]]
  return (
    <StyledPaper className={classes.paper} elevation={0}>
      <FormTabs tabs={tabs} activeTab={tab} setActiveTab={setTab}>
        <FormsTable forms={formsStructure} />
      </FormTabs>
    </StyledPaper>
  )
}
