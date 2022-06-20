import Card from "@material-ui/core/Card"
import Divider from "@material-ui/core/Divider"
import { makeStyles } from "@material-ui/core/styles"
import React, { memo } from "react"
import { Entry } from "../../graphql/generated"
import FormsRow from "./FormsRow/FormsRow"
import PrincipalPartsRow from "./PrincipalPartsRow/PrincipalPartsRow"
import TranslationsRow from "./TranslationsRow/TranslationsRow"

interface Props {
  entry: Entry
  searched: string
}
export default memo(function EntryCard({ entry, searched = "" }: Props) {
  const classes = useStyles()
  const {
    id,
    partOfSpeech,
    principalParts,
    inflection,
    bookmarked,
    translations,
    forms,
    identifiers,
  } = entry

  return (
    <Card elevation={4} className={classes.entryCard}>
      <PrincipalPartsRow
        {...{ id, partOfSpeech, principalParts, inflection, bookmarked }}
      />
      <Divider variant="inset" />
      <TranslationsRow translations={translations || []} />
      <FormsRow
        partOfSpeech={partOfSpeech}
        forms={forms}
        searched={searched}
        identifiers={identifiers || []}
      />
    </Card>
  )
})

const useStyles = makeStyles((theme: any) => ({
  entryCard: {
    display: "flex",
    flexDirection: "column",
    maxWidth: theme.custom.cardWidth,
    minWidth: theme.custom.cardWidth - theme.spacing(4),
    paddingBottom: 0,
    margin: theme.spacing(1),
  },
}))
