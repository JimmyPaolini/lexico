import { Divider, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useContext } from "react"
import LazyLoad from "react-lazyload"
import Line from "../../../../../entity/literature/Line"
import { getSettingsLocal } from "../../../utils/localSettings"
import { normalize } from "../../../utils/string"
import { Context } from "../../layout/Context"
import ReaderWord from "./ReaderWord"

interface ReaderLineProps {
  line: Line
  openModal: (word: string) => void
}

export default function ReaderLine({
  line,
  openModal,
}: ReaderLineProps): JSX.Element {
  const classes = useStyles()
  const { user } = useContext(Context)
  const words = normalize(line.line).match(/\w+|\W+/gi)

  return (
    <Grid container wrap="nowrap">
      <Typography
        className={classes.lineLabel}
        align="right"
        component="span"
        variant="inherit"
        style={{
          fontSize:
            (user?.settings.fontSize || getSettingsLocal().fontSize) - 3,
        }}>
        {line.lineLabel}
      </Typography>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <LazyLoad
        offset={1000}
        throttle={50}
        height={28}
        style={{ display: "inline" }}
        placeholder={
          <Typography component="span" variant="inherit">
            ...
          </Typography>
        }>
        {words?.map((word, i) => (
          <ReaderWord {...{ word, openModal }} key={line.id + i} />
        ))}
      </LazyLoad>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  lineLabel: {
    userSelect: "none",
    pointerEvents: "none",
    display: "inline-block",
    height: "100%",
    marginRight: theme.spacing(1) - 2,
    marginLeft: theme.spacing(1) - 2,
    marginTop: "auto",
    marginBottom: "auto",
    fontFamily: "courier, monospace",
    // fontSize: "1.3rem",
  },
  divider: {
    display: "inline",
    marginRight: theme.spacing(1) + 2,
    backgroundColor: theme.palette.primary.main,
  },
}))
