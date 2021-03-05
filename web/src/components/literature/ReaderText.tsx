import { Box } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import React from "react"
import Text from "../../../../entity/literature/Text"
import { romanNumeralize } from "../../utils/romanNumeral"
import { sentenceCase } from "../../utils/string"
import CardHeader from "../accessories/CardHeader"
import ReaderLine from "./ReaderLine"

interface Props {
  text: Text
  openModal: (word: string) => void
}
export default function ReaderText({ text, openModal }: Props) {
  const classes = useStyles()
  const theme = useTheme() as any

  const title = romanNumeralize(sentenceCase(text.title))
  let subtitle = romanNumeralize(sentenceCase(text.author.name))
  if (text.book)
    subtitle += " - " + romanNumeralize(sentenceCase(text.book.title))

  return (
    <Box className={classes.readerText}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          align: "center",
          style: {
            ...theme.typography.literature,
            ...theme.typography.literature.title,
          },
        }}
        subheader={subtitle}
        subheaderTypographyProps={{
          align: "center",
          style: {
            ...theme.typography.literature,
            ...theme.typography.literature.subtitle,
          },
        }}
        className={classes.cardHeader}
        classes={{ action: classes.shownAction }}
      />
      {text.lines.map((line) => (
        <ReaderLine {...{ line, openModal }} key={line.id} />
      ))}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  readerText: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardHeader: {
    width: "100%",
  },
  shownAction: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: 12,
  },
  hiddenAction: {
    marginTop: 8,
    marginRight: 8,
    visibility: "hidden",
  },
}))
