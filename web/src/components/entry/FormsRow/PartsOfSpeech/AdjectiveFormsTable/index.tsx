/* spellchecker: disable */
import { Box, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import { Forms, Maybe } from "../../../../../graphql/generated"
import FormsTable from "../../FormsTable"
import FormTabs from "../../FormTabs"
import { adjectiveFormsRestructure } from "./adjectiveFormsRestructure"

export interface AdjectiveFormsProps {
  forms?: Maybe<Forms>
}

export default function AdjectiveForms({ forms }: AdjectiveFormsProps) {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const structure = adjectiveFormsRestructure(forms)
  const tabs = Object.keys(structure)
  const formsStructure = structure[tabs[tab]]
  return (
    <Paper className={classes.paper} elevation={0}>
      <FormTabs tabs={tabs} activeTab={tab} setActiveTab={setTab}>
        <Box style={{ height: "8px" }} />
        <FormsTable forms={formsStructure} />
      </FormTabs>
    </Paper>
  )
}

const useStyles = makeStyles((theme: any) => ({
  paper: {
    maxWidth: theme.custom.cardWidth,
    borderRadius: 0,
  },
}))
