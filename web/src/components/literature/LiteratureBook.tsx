import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import Author from "../../../../server/src/entity/literature/Author"
import Book from "../../../../server/src/entity/literature/Book"
import { sentenceCase } from "../../utils/string"
import ExpandIcon from "../accessories/ExpandIcon"
import TextRow from "./LiteratureText"

interface Props {
  author: Author
  book: Book
  isLast: boolean
  searched: string
}

export default function LiteratureBook({
  author,
  book,
  isLast,
  searched = "",
}: Props) {
  const classes = useStyles()
  searched
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
          secondary={sentenceCase(author.name)}
        />
        <ExpandIcon {...{ expanded }} />
      </ListItem>
      {!isLast ? <Divider className={classes.inset1} /> : null}
      <Collapse in={expanded}>
        <List className={classes.noPadding} dense>
          {book.texts.map((text, i) => {
            const isTextLast = i === book.texts.length - 1 && isLast
            return (
              <TextRow
                {...{ author, book, text, isLast: isTextLast, searched }}
              />
            )
          })}
        </List>
      </Collapse>
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
