import React from 'react'

import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import FormCell, { FormCellPosition, Props as FormCellProps } from './FormCell'

const PREFIX = 'FormsTable'

const classes = {
  formsTable: `${PREFIX}-formsTable`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.formsTable}`]: {
    background: theme.palette.background.paper,
  },
}))

type Props = {
  forms: FormCellProps[]
}

export default function FormsTable({ forms }: Props) {
  return (
    <StyledGrid container className={classes.formsTable}>
      {forms.map((form: FormCellProps, i) => {
        const horizontal =
          i < 2 ? 'top' : i >= forms.length - 2 ? 'bottom' : 'mid'
        const vertical = i % 2 ? 'Right' : 'Left'
        const position = (horizontal + vertical) as FormCellPosition
        return (
          <Grid item xs={6} key={i}>
            <FormCell
              position={position}
              centerText={form.centerText}
              topLeftText={form.topLeftText}
              topRightText={form.topRightText}
              bottomLeftText={form.bottomLeftText}
              bottomRightText={form.bottomRightText}
            />
          </Grid>
        )
      })}
    </StyledGrid>
  )
}
