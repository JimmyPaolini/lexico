import { Divider, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import LazyLoad from "react-lazyload"
import Line from "../../../../entity/literature/Line"
import { normalize } from "../../utils/string"
import ReaderWord from "./ReaderWord"

interface Props {
  line: Line
  openModal: (word: string) => void
}

export default function ReaderLine({ line, openModal }: Props) {
  const classes = useStyles()
  const words = normalize(line.line).match(/\w+|\W+/gi)

  return (
    <Grid container wrap="nowrap">
      <Typography
        className={classes.lineNumber}
        align="right"
        component="span"
        variant="inherit"
      >
        {line.lineNumber}
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
        }
      >
        {words?.map((word, i) => (
          <ReaderWord {...{ word, openModal }} key={line.id + i} />
        ))}
      </LazyLoad>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  lineNumber: {
    userSelect: "none",
    pointerEvents: "none",
    display: "inline-block",
    height: "100%",
    minWidth: theme.spacing(4),
    marginRight: theme.spacing(1) - 2,
  },
  divider: {
    display: "inline",
    marginRight: theme.spacing(1) + 2,
    backgroundColor: theme.palette.primary.main,
  },
}))
