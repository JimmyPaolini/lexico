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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      classes={{ variantInfo: classes.snackbarInfo, action: classes.action }}
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
    flexWrap: "nowrap",
  },
  action: {
    flexShrink: 0,
    paddingLeft: 0,
  },
}))
