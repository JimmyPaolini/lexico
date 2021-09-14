import { CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { Inflection } from "../../../../../entity/dictionary/word/Inflection"
import { PartOfSpeech } from "../../../../../entity/dictionary/word/PartOfSpeech"
import PrincipalPart from "../../../../../entity/dictionary/word/PrincipalPart"
import { unCamelCase } from "../../../utils/string"
import ExpandIcon from "../../accessories/ExpandIcon"
import BookmarkButton from "./BookmarkButton"
import inflectionToString from "./inflectionToString"

interface PrincipalPartsRowProps {
  id: string
  partOfSpeech: PartOfSpeech
  principalParts: PrincipalPart[] | null
  inflection: Inflection | null | undefined
  bookmarked?: boolean
  expanded?: boolean
}
export default function PrincipalPartsRow({
  id,
  partOfSpeech,
  principalParts,
  inflection,
  bookmarked,
  expanded,
}: PrincipalPartsRowProps): JSX.Element {
  const classes = useStyles()

  const principalPartsFormatted = principalParts
    ?.map((principalPart) => principalPart.text.join("/"))
    .join(", ")

  const subheader = `${unCamelCase(partOfSpeech)}, ${inflectionToString(
    inflection,
    partOfSpeech,
  )}`.replace(/, ?$|^, ?/, "")

  return (
    <CardHeader
      title={principalPartsFormatted}
      titleTypographyProps={{ variant: "subtitle1" }}
      subheader={subheader}
      subheaderTypographyProps={{ variant: "subtitle2" }}
      className={classes.principalPartsRow}
      action={
        expanded === undefined ? (
          <BookmarkButton {...{ id, bookmarked }} />
        ) : (
          <ExpandIcon {...{ expanded }} style={{ marginTop: 8 }} />
        )
      }
      aria-label="Principal Parts, Inflection, and Bookmark toggle"
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
