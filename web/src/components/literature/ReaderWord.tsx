import { CardActionArea } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

interface Props {
  word: string
  openModal: (word: string) => null
}
export default function ReaderWord({ word, openModal }: Props) {
  const classes = useStyles()

  return (
    <CardActionArea
      className={classes.readerWord}
      component="span"
      onClick={() => openModal(word.replace(/\W/g, ""))}
    >
      {word}
    </CardActionArea>
  )
}

const useStyles = makeStyles(() => ({
  readerWord: {
    display: "inline",
    cursor: "pointer",
    borderRadius: 4,
    verticalAlign: "top",
  },
}))
