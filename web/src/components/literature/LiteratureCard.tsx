import {
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  List,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useContext, useState } from "react"
import Author from "../../../../entity/literature/Author"
import Book from "../../../../entity/literature/Book"
import { Context } from "../Context"
import LiteratureAuthor from "./LiteratureAuthor"
import LiteratureBook from "./LiteratureBook"
import LiteratureText from "./LiteratureText"

interface Props {
  author: Author
}

export default function LiteratureCard({ author }: Props) {
  const classes = useStyles()
  const { isMobile } = useContext(Context)
  const [expanded, setExpanded] = useState<boolean>(false)
  const books = author.books || ([] as Book[])
  const nonBookTexts = author.texts.filter((text) => !text.book)

  return (
    <Card elevation={4} className={classes.literatureCard}>
      <LiteratureAuthor {...{ author, expanded, setExpanded }} />
      <Collapse in={!isMobile || expanded}>
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
}

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
    "padding": 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  inset1: {
    marginLeft: theme.spacing(1),
  },
}))
