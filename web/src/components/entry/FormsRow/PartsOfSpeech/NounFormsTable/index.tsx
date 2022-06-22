/* spellchecker: disable */
import { Box, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { Forms, Maybe } from "../../../../../graphql/generated"
import FormsTable from "../../FormsTable"
import { nounFormsRestructure } from "./nounFormsRestructure"

type Props = {
  forms?: Maybe<Forms>
}

export default function NounForms({ forms }: Props) {
  const classes = useStyles()
  const formsStructure = nounFormsRestructure(forms)
  return (
    <Paper className={classes.paper} elevation={0}>
      <Box style={{ height: "4px" }} />
      <FormsTable forms={formsStructure} />
    </Paper>
  )
}

const useStyles = makeStyles((theme: any) => ({
  paper: {
    maxWidth: theme.custom.cardWidth,
    borderRadius: 0,
  },
}))
