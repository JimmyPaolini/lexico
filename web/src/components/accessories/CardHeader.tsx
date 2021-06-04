import { CardHeader as CardHeaderMui, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Menu } from "@material-ui/icons"
import React, { useContext } from "react"
import { Context } from "../layout/Context"

interface Props {
  title: string
  [key: string]: any
}
export default function CardHeader({ title, ...props }: Props) {
  const classes = useStyles()
  const { isMobile, isNavOpen, setNavOpen } = useContext(Context)

  return (
    <CardHeaderMui
      title={title}
      titleTypographyProps={{ variant: "h4", align: "center" }}
      avatar={
        isMobile && (
          <IconButton onClick={() => setNavOpen(!isNavOpen)} aria-label="menu">
            <Menu />
          </IconButton>
        )
      }
      action={
        isMobile && (
          <IconButton
            onClick={() => null}
            aria-label="empty space"
            className={classes.hiddenAction}
          >
            <Menu />
          </IconButton>
        )
      }
      {...props}
    />
  )
}

const useStyles = makeStyles(() => ({
  hiddenAction: {
    marginTop: 8,
    marginRight: 8,
    visibility: "hidden",
  },
}))
