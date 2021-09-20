import {
  Box,
  Collapse,
  Divider,
  Grid,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { memo, useState } from "react"
import { Author, Book } from "../../graphql/generated"
import { sentenceCase } from "../../utils/string"
import ExpandIcon from "../accessories/ExpandIcon"
import LiteratureText from "./LiteratureText"

interface Props {
  author: Author
  book: Book
  isLast: boolean
}

export default memo(function LiteratureBook({
  book,
  isLast,
}: Props): JSX.Element {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <>
      <ListItem
        button
        onClick={() => setExpanded((expanded) => !expanded)}
        key={book.id}
        classes={{ button: classes.hideHoverHighlight }}
        disableRipple
        disableTouchRipple>
        <ListItemText
          primary={sentenceCase(book.title).replace(/^\d+ /, "")}
          primaryTypographyProps={{ variant: "body1" }}
        />
        <Box py="auto" mr={0.5} display="flex">
          <ExpandIcon expanded={expanded} />
        </Box>
      </ListItem>
      <Collapse in={expanded} mountOnEnter>
        <Grid container justify="center" alignItems="stretch">
          {book.texts.map((text) => (
            <LiteratureText {...{ text }} key={text.id} />
          ))}
        </Grid>
      </Collapse>
      {!isLast ? <Divider className={classes.inset1} /> : null}
    </>
  )
})

const useStyles = makeStyles((theme: any) => ({
  hideHoverHighlight: {
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  inset1: {
    marginLeft: theme.spacing(1),
  },
}))
