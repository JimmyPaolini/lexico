import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { SnackbarProvider } from "notistack"
import React, { ReactNode } from "react"
import Navigation from "./Navigation"

interface Props {
  children?: ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  const classes = useStyles()

  return (
    <SnackbarProvider
      classes={{ variantInfo: classes.snackbarInfo }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      hideIconVariant>
      <Grid container>
        <Grid item>
          <Navigation />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </SnackbarProvider>
  )
}

const useStyles = makeStyles((theme: any) => ({
  snackbarInfo: {
    backgroundColor: `${theme.palette.background.paper} !important`,
  },
}))
