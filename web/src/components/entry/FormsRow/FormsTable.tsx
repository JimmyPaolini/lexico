import React from 'react'

import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import FormCell, { FormCellPosition, Props as FormCellProps } from './FormCell'

type Props = { forms: FormCellProps[] }

export default function FormsTable({ forms }: Props) {
  const theme = useTheme()
  return (
    <Grid container sx={{ background: theme.palette.background.paper }}>
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
    </Grid>
  )
}
