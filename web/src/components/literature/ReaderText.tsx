import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import Line from "../../../../server/src/entity/literature/Line"
import ReaderLine from "./ReaderLine"

interface Props {
  lines: Line[]
  openModal: (word: string) => null
}
export default function ReaderText({ lines, openModal }: Props) {
  const classes = useStyles()

  return (
    <Box className={classes.readerText}>
      {lines.map(({ line, lineNumber }) => (
        <ReaderLine
          {...{ line, lineNumber, openModal }}
          key={line + lineNumber}
        />
      ))}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  readerText: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}))
