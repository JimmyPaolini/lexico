import { Box, CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { Inflection, Maybe, PrincipalPart } from "../../../graphql/generated"
import { unCamelCase } from "../../../utils/string"
import ExpandIcon from "../../accessories/ExpandIcon"
import BookmarkButton from "./BookmarkButton"
import inflectionToString from "./inflectionToString"

export interface PrincipalPartsRowProps {
  id: string
  partOfSpeech: string
  principalParts: Maybe<PrincipalPart[]> | undefined
  inflection: Inflection | null | undefined
  bookmarked?: Maybe<boolean>
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
          <Box mt={2.5} mr={1.5}>
            <ExpandIcon expanded={expanded} />
          </Box>
        )
      }
      aria-label="Principal Parts, Inflection, and Bookmark toggle"
    />
  )
}

const useStyles = makeStyles((theme) => ({
  principalPartsRow: {
    background: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  bookmark: {
    display: "inline-block",
    position: "relative",
    top: 8,
  },
}))
