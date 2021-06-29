import { CardActionArea } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { memo } from "react"

interface ReaderWordProps {
  word: string
  openModal: (word: string) => void
}
<<<<<<< HEAD:web/src/components/literature/reader/ReaderWord.tsx
export default memo(function ReaderWord({
  word,
  openModal,
}: ReaderWordProps): JSX.Element {
=======
export default function ReaderWord({ word, openModal }: Props): JSX.Element {
>>>>>>> aa3bf910bc (linting and formatting implementation):web/src/components/literature/ReaderWord.tsx
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
})

const useStyles = makeStyles(() => ({
  readerWord: {
    display: "inline",
    cursor: "pointer",
    borderRadius: 4,
    verticalAlign: "top",
  },
}))
