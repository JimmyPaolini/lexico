import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import FormCell, { FormCellPosition, FormCellProps } from "./FormCell"

interface Props {
  forms: FormCellProps[]
}

export default function FormsTable({ forms }: Props): JSX.Element {
  const classes = useStyles()
  return (
    <Grid container className={classes.formsTable}>
      {forms.map((form: FormCellProps, i) => {
        const horizontal =
          i < 2 ? "top" : i >= forms.length - 2 ? "bottom" : "mid"
        const vertical = i % 2 ? "Right" : "Left"
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

const useStyles = makeStyles((theme) => ({
  formsTable: {
    background: theme.palette.background.paper,
  },
}))
