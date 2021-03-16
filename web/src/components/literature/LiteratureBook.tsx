import {
  Collapse,
  Divider,
  Grid,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import Author from "../../../../entity/literature/Author"
import Book from "../../../../entity/literature/Book"
import { sentenceCase } from "../../utils/string"
import ExpandIcon from "../accessories/ExpandIcon"
import LiteratureText from "./LiteratureText"

interface Props {
  author: Author
  book: Book
  isLast: boolean
}

export default function LiteratureBook({ author, book, isLast }: Props) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <>
      <ListItem
        button
        onClick={() => setExpanded((expanded) => !expanded)}
        key={book.id}
      >
        <ListItemText
          primary={sentenceCase(book.title)}
          primaryTypographyProps={{ variant: "body1" }}
        />
        <ExpandIcon {...{ expanded }} style={{ padding: 0 }} />
      </ListItem>
      <Collapse in={expanded}>
        <Grid container justify="center" alignItems="center">
          {book.texts.map((text) => (
            <LiteratureText {...{ author, book, text }} />
          ))}
        </Grid>
      </Collapse>
      {!isLast ? <Divider className={classes.inset1} /> : null}
    </>
  )
}

const useStyles = makeStyles((theme: any) => ({
  noPadding: {
    "padding": 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  inset1: {
    marginLeft: theme.spacing(1),
  },
}))