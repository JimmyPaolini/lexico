import { Box, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { normalize } from "../../utils/string"
import ReaderWord from "./ReaderWord"

interface Props {
  line: string
  lineNumber: number
  openModal: (word: string) => null
}
export default function ReaderLine({ line, lineNumber, openModal }: Props) {
  const classes = useStyles()
  line = normalize(line)

  return (
    <Grid item container wrap="nowrap">
      <Typography
        variant="inherit"
        align="right"
        className={classes.lineNumber}
      >
        {lineNumber}
      </Typography>

      <Typography variant="inherit">
        {line.match(/\w+|\W+/gi)?.map((word, i) => {
          return word.match(/\w+/i) ? (
            <ReaderWord {...{ word, openModal }} key={word + i} />
          ) : (
            <Box component="span" style={{ display: "inline" }} key={word + i}>
              {word}
            </Box>
          )
        })}
      </Typography>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  lineNumber: {
    minWidth: theme.spacing(6),
    marginRight: theme.spacing(2),
    pointerEvents: "none",
    userSelect: "none",
  },
}))
