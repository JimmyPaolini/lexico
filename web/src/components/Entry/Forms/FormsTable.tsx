import { ComponentProps } from 'react'

import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Form, FormCellPosition } from './Form/Form'

type Props = { forms: ComponentProps<typeof Form>[]; search?: string }

export const FormsTable = ({ forms, search }: Props) => {
  const theme = useTheme()
  return (
    <Grid container sx={{ background: theme.palette.background.paper }}>
      {forms.map((form, i) => {
        const horizontal =
          i < 2 ? 'top' : i >= forms.length - 2 ? 'bottom' : 'mid'
        const vertical = i % 2 ? 'Right' : 'Left'
        const position = (horizontal + vertical) as FormCellPosition
        return (
          <Grid item xs={6} key={i}>
            <Form
              position={position}
              centerText={form.centerText}
              topLeftText={form.topLeftText}
              topRightText={form.topRightText}
              bottomLeftText={form.bottomLeftText}
              bottomRightText={form.bottomRightText}
              search={search}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
