import {
  CardHeader as CardHeaderMui,
  IconButton,
  useMediaQuery,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Menu } from "@material-ui/icons"
import React, { useContext } from "react"
import { sentenceCase } from "../../utils/string"
import { Context } from "../Context"

interface Props {
  title: string
  props?: any
}
export default function CardHeader({ title, props }: Props) {
  const classes = useStyles()
  const { isNavOpen, setNavOpen } = useContext(Context)
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"))

  return (
    <CardHeaderMui
      title={sentenceCase(title)}
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
