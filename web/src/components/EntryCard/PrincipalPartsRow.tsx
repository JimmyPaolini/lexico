import { CardHeader, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Bookmark, BookmarkBorder } from "@material-ui/icons"
import React, { useState } from "react"
import Entry from "../../../../server/src/entity/dictionary/Entry"
import {
  createBookmark,
  deleteBookmark,
  isBookmarked,
} from "../../utils/bookmarksController"
import { getId } from "../../utils/globals"

interface Props {
  entry: Entry
}

export default function PrincipalPartsRow({ entry }: Props) {
  const classes = useStyles()
  const principalPartsRestructured = getId(entry)

  const [bookmarked, setBookmarked] = useState(isBookmarked(entry))
  const toggleBookmark = () => {
    if (bookmarked) deleteBookmark(entry)
    else createBookmark(entry)
    setBookmarked(!bookmarked)
  }
  return (
    <CardHeader
      title={principalPartsRestructured}
      titleTypographyProps={{ variant: "subtitle1" }}
      subheader={`${entry.partOfSpeech}, ${entry.inflection}`}
      subheaderTypographyProps={{ variant: "subtitle2" }}
      className={classes.principalPartsRow}
      aria-label="Principal Parts and Inflection"
      action={
        <IconButton
          onClick={toggleBookmark}
          className={classes.bookmark}
          aria-label="Bookmark"
        >
          {bookmarked ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      }
    />
  )
}

const useStyles = makeStyles((theme) => ({
  principalPartsRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  bookmark: {
    display: "inline-block",
    position: "relative",
    top: 8,
  },
}))
