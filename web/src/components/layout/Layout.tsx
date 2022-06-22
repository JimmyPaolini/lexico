import { Grid } from "@material-ui/core"
import React, { ReactNode } from "react"
import Navigation from "./Navigation"
import Snackbar from "./Snackbar"

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Snackbar>
      <Grid container>
        <Grid item>
          <Navigation />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </Snackbar>
  )
}
