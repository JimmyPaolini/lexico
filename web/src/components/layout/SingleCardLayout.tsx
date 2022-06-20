import { Grid, Grow } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { ReactNode } from "react"

interface Props {
  children?: ReactNode
}
export default function SingleCardLayout({ children }: Props) {
  const classes = useStyles()

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item className={classes.column}>
        <Grow in={true}>
          <Grid>{children}</Grid>
        </Grow>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  column: {
    width: theme.custom.cardWidth,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}))
