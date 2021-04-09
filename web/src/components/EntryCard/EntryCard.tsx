import Card from "@material-ui/core/Card"
import Divider from "@material-ui/core/Divider"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import Entry from "../../../../entity/dictionary/Entry"
import FormsRow from "./FormsRow/FormsRow"
import PrincipalPartsRow from "./PrincipalPartsRow"
import TranslationsRow from "./TranslationsRow"

interface Props {
  entry: Entry
  searched: string
}
export default function EntryCard({ entry, searched = "" }: Props) {
  const classes = useStyles()
  return (
    <Card elevation={4} className={classes.entryCard}>
      <PrincipalPartsRow entry={entry} />
      <Divider variant="inset" />
      <TranslationsRow translations={entry.translations!} />
      <FormsRow
        partOfSpeech={entry.partOfSpeech}
        forms={entry.forms}
        searched={searched}
        identifiers={entry.identifiers || []}
      />
    </Card>
  )
}

const useStyles = makeStyles((theme: any) => ({
  entryCard: {
    maxWidth: theme.custom.cardWidth,
    minWidth: theme.custom.cardWidth - 32,
    display: "inline-block",
    paddingBottom: theme.spacing(0),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))
