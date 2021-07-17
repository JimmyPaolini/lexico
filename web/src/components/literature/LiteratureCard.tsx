import {
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  List,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { memo, useState } from "react"
import Author from "../../../../entity/literature/Author"
import Book from "../../../../entity/literature/Book"
import LiteratureAuthor from "./LiteratureAuthor"
import LiteratureBook from "./LiteratureBook"
import LiteratureText from "./LiteratureText"

interface LiteratureCardProps {
  author: Author
}
export default memo(function LiteratureCard({
  author,
}: LiteratureCardProps): JSX.Element {
  const classes = useStyles()
  const books = author.books || ([] as Book[])
  const nonBookTexts = author.texts.filter(
    (text) =>
      !books.some((book) =>
        book.texts.some((bookText) => bookText.id === text.id),
      ),
  )
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Card elevation={4} className={classes.literatureCard}>
      <LiteratureAuthor {...{ author, expanded, setExpanded }} />
      <Collapse in={expanded} mountOnEnter>
        <Divider style={{ marginRight: 8 }} />
        <CardContent className={classes.noPadding}>
          <List className={classes.noPadding} dense>
            {books.map((book, i) => {
              const isLast = i === books.length - 1 && !nonBookTexts.length
              return (
                <LiteratureBook {...{ author, book, isLast }} key={book.id} />
              )
            })}
            <Grid container justify="center" alignItems="stretch">
              {nonBookTexts.map((text) => (
                <LiteratureText {...{ text }} key={text.id} />
              ))}
            </Grid>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
})

const useStyles = makeStyles((theme: any) => ({
  literatureCard: {
    display: "flex",
    flexDirection: "column",
    maxWidth: theme.custom.cardWidth,
    minWidth: theme.custom.cardWidth - theme.spacing(4),
    paddingBottom: 0,
    margin: theme.spacing(1),
  },
  noPadding: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  inset1: {
    marginLeft: theme.spacing(1),
  },
}))
