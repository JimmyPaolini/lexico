import { Button, CardHeader, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Bookmark, BookmarkBorder } from "@material-ui/icons"
import { useRouter } from "next/router"
import { SnackbarKey } from "notistack"
import React, { useContext, useState } from "react"
import Entry from "../../../../entity/dictionary/Entry"
import AdjectiveInflection from "../../../../entity/dictionary/word/inflection/AdjectiveInflection"
import AdverbInflection from "../../../../entity/dictionary/word/inflection/AdverbInflection"
import NounInflection from "../../../../entity/dictionary/word/inflection/NounInflection"
import PrepositionInflection from "../../../../entity/dictionary/word/inflection/PrepositionInflection"
import Uninflected from "../../../../entity/dictionary/word/inflection/Uninflected"
import VerbInflection from "../../../../entity/dictionary/word/inflection/VerbInflection"
import useBookmark from "../../hooks/bookmarks/useBookmark"
import useUnbookmark from "../../hooks/bookmarks/useUnbookmark"
import useSnackbarEnhanced from "../../hooks/useSnackbarEnhanced"
import {
  bookmarkLocal,
  isBookmarkedLocal,
  showBookmarkInstructions,
  unbookmarkLocal,
} from "../../utils/localBookmarks"
import { unCamelCase } from "../../utils/string"
import { Context } from "../layout/Context"

interface Props {
  entry: Entry
}
export default function PrincipalPartsRow({ entry }: Props): JSX.Element {
  const classes = useStyles()
  const { user } = useContext(Context)

  const [bookmarked, setBookmarked] = useState<boolean>(
    user ? !!entry.bookmarked : isBookmarkedLocal(entry.id),
  )
  const { mutateAsync: bookmark } = useBookmark(setBookmarked)
  const { mutateAsync: unbookmark } = useUnbookmark(setBookmarked)

  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbarEnhanced()
  const toggleBookmark = async () => {
    if (user) {
      if (!bookmarked) await bookmark(entry.id)
      else await unbookmark(entry.id)
    } else {
      if (!bookmarked) {
        bookmarkLocal(entry.id)
        setBookmarked(true)
      } else {
        unbookmarkLocal(entry.id)
        setBookmarked(false)
      }
      if (showBookmarkInstructions()) {
        const action = (key: SnackbarKey) => (
          <Button
            onClick={() => {
              closeSnackbar(key)
              router.push("/user")
            }}
            color="secondary">
            Sign in
          </Button>
        )
        enqueueSnackbar(
          `Your bookmarks are saved locally, sign in to save them across devices/browsers`,
          { action },
        )
      }
    }
  }

  const principalPartsFormatted = entry?.principalParts
    ?.map((principalPart) => principalPart.text.join("/"))
    .join(", ")

  return (
    <CardHeader
      title={principalPartsFormatted}
      titleTypographyProps={{ variant: "subtitle1" }}
      subheader={`${unCamelCase(entry.partOfSpeech)}, ${inflectionToString(
        entry,
      )}`.replace(/, ?$/, "")}
      subheaderTypographyProps={{ variant: "subtitle2" }}
      className={classes.principalPartsRow}
      aria-label="Principal Parts, Inflection, and Bookmark"
      action={
        <IconButton
          onClick={toggleBookmark}
          className={classes.bookmark}
          aria-label="Bookmark">
          {bookmarked ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      }
    />
  )
}

function inflectionToString(entry: Entry) {
  const isNoun = ["noun", "properNoun"].includes(entry.partOfSpeech)
  const isAdjective = ["adjective", "participle", "numeral", "suffix"].includes(
    entry.partOfSpeech,
  )
  if (isNoun) {
    const declension = (entry?.inflection as NounInflection)?.declension
    const gender = (entry?.inflection as NounInflection)?.gender
    if (declension && gender) return declension + " declension, " + gender
    if (declension) return declension + " declension"
    if (gender) return gender
  } else if (entry.partOfSpeech === "verb") {
    const conjugation = (entry?.inflection as VerbInflection)?.conjugation
    if (conjugation) return conjugation + " conjugation"
  } else if (isAdjective) {
    const declension = (entry?.inflection as AdjectiveInflection)?.declension
    const degree = (entry?.inflection as AdjectiveInflection)?.degree
    if (declension && degree) return declension + " declension, " + degree
    if (declension) return declension + " declension"
    if (degree) return degree
  } else if (entry.partOfSpeech === "adverb") {
    const type = (entry?.inflection as AdverbInflection)?.type
    const degree = (entry?.inflection as AdverbInflection)?.degree
    if (type && degree) return type + ", " + degree
    if (type) return type
    if (degree) return degree
  } else if (entry.partOfSpeech === "preposition") {
    const case_ = (entry?.inflection as PrepositionInflection)?.case
    return case_
  } else {
    const other = (entry?.inflection as Uninflected)?.other
    return other
  }
  return ""
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
