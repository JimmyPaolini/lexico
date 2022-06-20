/* spellchecker: disable */
import { Box, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import { Forms, Maybe } from "../../../../../graphql/generated"
import FormsTable from "../../FormsTable"
import FormTabs from "../../FormTabs"
import { verbFormsRestructure } from "./verbFormsRestructure"

interface Props {
  forms?: Maybe<Forms>
}

export default function VerbForms({ forms }: Props): JSX.Element {
  const classes = useStyles()
  const [topTab, setTopTabState] = useState(0)
  const [midTab, setMidTabState] = useState(0)
  const [bottomTab, setBottomTab] = useState(0)

  const structure = verbFormsRestructure(forms)
  const topTabs = Object.keys(structure)
  let midTabs = Object.keys(structure?.[topTabs[topTab]] || { "-": "" })
  let bottomTabs = Object.keys(
    structure?.[topTabs[topTab]]?.[midTabs[midTab]] || { "-": "" },
  )

  const setTopTab = (newTopTab: number) => {
    const oldBottomTab = bottomTabs[bottomTab]
    const oldMidTab = midTabs[midTab]

    setTopTabState(newTopTab)

    midTabs = Object.keys(structure?.[topTabs[newTopTab]] || { "-": "" })
    const newMidTab =
      midTabs.indexOf(oldMidTab) !== -1 ? midTabs.indexOf(oldMidTab) : 0
    setMidTabState(
      midTabs.indexOf(oldMidTab) !== -1 ? midTabs.indexOf(oldMidTab) : 0,
    )

    bottomTabs = Object.keys(
      structure?.[topTabs[newTopTab]]?.[midTabs[newMidTab]] || { "-": "" },
    )
    setBottomTab(
      bottomTabs.indexOf(oldBottomTab) !== -1
        ? bottomTabs.indexOf(oldBottomTab)
        : 0,
    )
  }

  const setMidTab = (newMidTab: number) => {
    const oldBottomTab = bottomTabs[bottomTab]

    setMidTabState(newMidTab)

    bottomTabs = Object.keys(
      structure?.[topTabs[topTab]]?.[midTabs[newMidTab]] || { "-": "" },
    )
    setBottomTab(
      bottomTabs.indexOf(oldBottomTab) !== -1
        ? bottomTabs.indexOf(oldBottomTab)
        : 0,
    )
  }

  const formsStructure =
    structure[topTabs[topTab]][midTabs[midTab]][bottomTabs[bottomTab]]

  return (
    <Paper className={classes.paper} elevation={0}>
      <FormTabs tabs={topTabs} activeTab={topTab} setActiveTab={setTopTab}>
        <FormTabs tabs={midTabs} activeTab={midTab} setActiveTab={setMidTab}>
          <FormTabs
            tabs={bottomTabs}
            activeTab={bottomTab}
            setActiveTab={setBottomTab}
          >
            <Box style={{ height: "8px" }} />
            <FormsTable forms={formsStructure} />
          </FormTabs>
        </FormTabs>
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
