import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import FormCell from "./FormCell"

interface Props {
  forms: any[]
}

export default function FormsTable({ forms }: Props) {
  const classes = useStyles()
  return (
    <Grid container className={classes.formsTable}>
      {forms.map((form: any, i) => {
        const horizontal =
          i < 2 ? "top" : i >= forms.length - 2 ? "bottom" : "mid"
        const vertical = i % 2 ? "Right" : "Left"
        const position = horizontal + vertical
        return (
          <Grid item xs={6} key={i}>
            <FormCell
              position={position}
              center={form.center}
              topLeft={form.topLeft}
              topRight={form.topRight}
              bottomLeft={form.bottomLeft}
              bottomRight={form.bottomRight}
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
