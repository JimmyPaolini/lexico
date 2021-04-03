import { Grid } from "@material-ui/core"
import React, { ReactNode } from "react"
import Navigation from "./Navigation"

interface Props {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Grid container>
      <Grid item>
        <Navigation />
      </Grid>
      <Grid item xs>
        {children}
      </Grid>
    </Grid>
  )
}
