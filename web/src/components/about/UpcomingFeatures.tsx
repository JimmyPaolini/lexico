import {
  Box,
  CardActionArea,
  CardHeader as CardHeaderMui,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Launch } from "@material-ui/icons"
import React from "react"
import packageJson from "../../../../package.json"

const { version } = packageJson

export default function ToolIconGrid() {
  const classes = useStyles()

  return (
    <>
      <CardActionArea
        disableRipple
        disableTouchRipple
        classes={{ focusHighlight: classes.hide }}
        href="https://github.com/JimmyPaolini/Lexico/issues"
        target="_blank"
      >
        <CardHeaderMui
          title={`Upcoming Releases (current v${version})`}
          titleTypographyProps={{ variant: "body1" }}
          className={classes.dropdown}
          action={
            <Box className={classes.iconContainer}>
              <Launch />
            </Box>
          }
        />
      </CardActionArea>
    </>
  )
}

const useStyles = makeStyles((theme: any) => ({
  dropdown: {
    paddingTop: 0,
    paddingBottom: 0,
    padding: theme.spacing(1),
  },
  toolGrid: {
    padding: theme.spacing(1),
  },
  tool: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
  iconContainer: {
    padding: 12,
    paddingTop: 20,
    paddingRight: 20,
  },
}))
