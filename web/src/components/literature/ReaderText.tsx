import { Box, CardHeader, IconButton, useMediaQuery } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Menu } from "@material-ui/icons"
import React, { useContext } from "react"
import Text from "../../../../entity/literature/Text"
import { romanNumeralize } from "../../utils/romanNumeral"
import { sentenceCase } from "../../utils/string"
import { Context } from "../Context"
import ReaderLine from "./ReaderLine"

interface Props {
  text: Text
  openModal: (word: string) => void
}
export default function ReaderText({ text, openModal }: Props) {
  const classes = useStyles()
  const theme = useTheme() as any
  const { isNavOpen, setNavOpen } = useContext(Context)
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"))

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
        avatar={
          <IconButton
            onClick={isMobile ? () => setNavOpen(!isNavOpen) : undefined}
            aria-label="menu"
            className={!isMobile ? classes.hiddenAction : undefined}
          >
            <Menu />
          </IconButton>
        }
        action={
          <IconButton
            onClick={() => null}
            aria-label="empty space"
            className={classes.hiddenAction}
          >
            <Menu />
          </IconButton>
        }
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
