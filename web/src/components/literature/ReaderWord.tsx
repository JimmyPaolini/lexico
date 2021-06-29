import { CardActionArea } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

interface Props {
  word: string
  openModal: (word: string) => void
}
export default function ReaderWord({ word, openModal }: Props): JSX.Element {
  const classes = useStyles()
  const isWord = word.match(/\w+/i)

  return isWord ? (
    <CardActionArea
      className={classes.readerWord}
      component="span"
      onClick={() => openModal(word.toLowerCase())}>
      {word}
    </CardActionArea>
  ) : (
    <>{word}</>
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
