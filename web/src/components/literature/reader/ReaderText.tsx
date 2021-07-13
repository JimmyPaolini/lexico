import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import Text from "../../../../../entity/literature/Text"
import { MyTheme } from "../../../theme/theme"
import { sentenceCase } from "../../../utils/string"
import CardHeader from "../../accessories/CardHeader"
import ReaderLine from "./ReaderLine"

interface ReaderTextProps {
  text: Text
  openModal: (word: string) => void
}
export default function ReaderText({
  text,
  openModal,
}: ReaderTextProps): JSX.Element {
  const classes = useStyles()

  const title = sentenceCase(text.title)
  let subtitle = sentenceCase(text.author.id)
  if (text.book)
    subtitle += " - " + sentenceCase(text.book.title).replace(/^\d+ /, "")

  return (
    <Box className={classes.readerText}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          className: classes.title,
          component: "h1",
        }}
        subheader={subtitle}
        subheaderTypographyProps={{
          className: classes.subtitle,
          component: "h2",
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

const useStyles = makeStyles((theme: MyTheme) => ({
  readerText: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    ...theme.typography.literature,
    fontSize: "1.7rem",
    lineHeight: 1.3,
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
  },
  subtitle: {
    textAlign: "center",
    ...theme.typography.literature,
    fontSize: "1.3rem",
    lineHeight: 1.0,
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.0rem",
      lineHeight: 1.0,
    },
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
