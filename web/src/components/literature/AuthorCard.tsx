import { Card, CardContent, CardHeader, Divider, List } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import Author from "../../../../server/src/entity/literature/Author"
import Book from "../../../../server/src/entity/literature/Book"
import { sentenceCase } from "../../utils/string"
import BookRow from "./BookRow"
import TextRow from "./TextRow"

interface Props {
  author: Author
  searched: string
}

export default function AuthorCard({ author, searched = "" }: Props) {
  const classes = useStyles()
  searched
  const books = author.books || ([] as Book[])
  const nonBookTexts = author.texts.filter((text) => !text.book)
  console.log(nonBookTexts)

  return (
    <Card elevation={4} className={classes.authorCard}>
      <CardHeader
        title={sentenceCase(author.name)}
        subheader={sentenceCase(author.fullname)}
      />
      <Divider style={{ marginRight: 8 }} />
      <CardContent className={classes.noPadding}>
        <List className={classes.noPadding} dense>
          {books.map((book, i) => {
            const isLast = i === books.length - 1 && !nonBookTexts.length
            return <BookRow {...{ author, book, isLast, searched }} />
          })}
          {nonBookTexts.map((text, i) => {
            const isLast = i === nonBookTexts.length - 1
            return <TextRow {...{ author, text, isLast, searched }} />
          })}
        </List>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles((theme: any) => ({
  authorCard: {
    "width": theme.custom.cardWidth,
    "display": "inline-block",
    "paddingBottom": 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
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
