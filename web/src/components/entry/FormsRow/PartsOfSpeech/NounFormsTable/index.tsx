/* spellchecker: disable */
import React from 'react'

import { Box, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Forms, Maybe } from '../../../../../graphql/generated'
import FormsTable from '../../FormsTable'
import { nounFormsRestructure } from './nounFormsRestructure'

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

export default function NounForms({ forms }: Props) {
  const formsStructure = nounFormsRestructure(forms)
  return (
    <StyledPaper className={classes.paper} elevation={0}>
      <Box style={{ height: '4px' }} />
      <FormsTable forms={formsStructure} />
    </StyledPaper>
  )
}
