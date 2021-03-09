import { Avatar, CardActionArea, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Subject } from "@material-ui/icons"
import React from "react"
import Author from "../../../../entity/literature/Author"
import Book from "../../../../entity/literature/Book"
import Text from "../../../../entity/literature/Text"
import { romanNumeralize } from "../../utils/romanNumeral"
import { sentenceCase } from "../../utils/string"

interface Props {
  author: Author
  book?: Book
  text: Text
}
export default function LiteratureText({ author, book, text }: Props) {
  const classes = useStyles()
  let url = `literature/${author.name}`
  if (book) url += `/${book.title}/${book.id}`
  url += `/${text.title}/${text.id}`
  const isTitleBook = text.title.match(/book \d+/i)

  return (
    <Grid item className={classes.textContainer} container justify="center">
      <CardActionArea href={url}>
        <Avatar className={classes.textAvatar}>
          {!isTitleBook ? (
            <Subject />
          ) : (
            romanNumeralize(text.title.match(/\d+/)?.[0])
          )}
        </Avatar>
        {!book ? (
          <Typography align="center" gutterBottom>
            {romanNumeralize(sentenceCase(text.title))}
          </Typography>
        ) : null}
      </CardActionArea>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  textContainer: {
    flex: "20%",
  },
  textAvatar: {
    padding: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  inset1: {
    marginLeft: theme.spacing(1),
  },
}))
