import { makeStyles } from "@material-ui/core/styles"
import { SnackbarProvider } from "notistack"
import React, { ReactNode } from "react"

interface Props {
  children?: ReactNode
}

export default function Snackbar({ children }: Props): JSX.Element {
  const classes = useStyles()

  return (
    <SnackbarProvider
      classes={{ variantInfo: classes.snackbarInfo }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      hideIconVariant
      preventDuplicate>
      {children}
    </SnackbarProvider>
  )
}

const useStyles = makeStyles((theme: any) => ({
  snackbarInfo: {
    backgroundColor: `${theme.palette.background.paper} !important`,
  },
}))
