import { Divider, ListItem, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import Author from "../../../../server/src/entity/literature/Author"
import Book from "../../../../server/src/entity/literature/Book"
import Text from "../../../../server/src/entity/literature/Text"
import { romanNumeralize } from "../../utils/romanNumeral"
import { sentenceCase } from "../../utils/string"

interface Props {
  author: Author
  book?: Book
  text: Text
  isLast: boolean
  searched: string
}

export default function TextRow({
  author,
  book,
  text,
  isLast,
  searched = "",
}: Props) {
  const classes = useStyles()
  searched
  let url = `literature/${author.name}`
  if (book) url += `/${book.title}/${book.id}`
  url += `/${text.title}/${text.id}`

  return (
    <>
      <ListItem button component="a" href={url} key={text.id}>
        <ListItemText
          primary={romanNumeralize(sentenceCase(text.title))}
          secondary={
            book ? sentenceCase(book.title) : sentenceCase(author.name)
          }
          className={classes.inset1}
        />
      </ListItem>
      {!isLast ? (
        <Divider className={!!book ? classes.inset2 : classes.inset1} />
      ) : null}
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
  inset2: {
    marginLeft: theme.spacing(2),
  },
}))
