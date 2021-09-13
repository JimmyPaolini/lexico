/* spellchecker: disable */
import { Box, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import { Forms, Maybe } from "../../../../graphql/generated"
import FormsTable from "../FormsTable"
import FormTabs from "../FormTabs"

export interface AdjectiveFormsProps {
  forms?: Maybe<Forms>
}

export default function AdjectiveForms({
  forms,
}: AdjectiveFormsProps): JSX.Element {
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

const adjectiveFormsRestructure = (forms: any) => {
  // console.log("structureTemplate", structureTemplate);
  const structure = JSON.parse(JSON.stringify(structureTemplate))

  function structureGender(struc: any, GEN: any, gender: any) {
    struc[GEN][0].center = forms?.[gender]?.nominative?.singular?.join?.(",\n")
    struc[GEN][1].center = forms?.[gender]?.nominative?.plural?.join?.(",\n")
    struc[GEN][2].center = forms?.[gender]?.genitive?.singular?.join?.(",\n")
    struc[GEN][3].center = forms?.[gender]?.genitive?.plural?.join?.(",\n")
    struc[GEN][4].center = forms?.[gender]?.dative?.singular?.join?.(",\n")
    struc[GEN][5].center = forms?.[gender]?.dative?.plural?.join?.(",\n")
    struc[GEN][6].center = forms?.[gender]?.accusative?.singular?.join?.(",\n")
    struc[GEN][7].center = forms?.[gender]?.accusative?.plural?.join?.(",\n")
    struc[GEN][8].center = forms?.[gender]?.ablative?.singular?.join?.(",\n")
    struc[GEN][9].center = forms?.[gender]?.ablative?.plural?.join?.(",\n")

    if (forms?.[gender]?.vocative) {
      struc[GEN].splice(
        struc[GEN].length,
        0,
        {
          topLeft: "VOC",
          center: forms?.[gender]?.vocative?.singular?.join(",\n"),
        },
        {
          center: forms?.[gender]?.vocative?.plural?.join(",\n"),
        },
      )
    }

    if (forms?.[gender]?.locative) {
      struc[GEN].splice(
        struc[GEN].length,
        0,
        {
          topLeft: "LOC",
          center: forms?.[gender]?.locative?.singular?.join(",\n"),
        },
        {
          center: forms?.[gender]?.locative?.plural?.join(",\n"),
        },
      )
    }
  }

  structureGender(structure, "MASC", "masculine")
  structureGender(structure, "FEM", "feminine")
  structureGender(structure, "NEU", "neuter")

  for (const gen of Object.keys(structure)) {
    if (structure[gen].every((cell: any) => !cell.center)) delete structure[gen]
  }

  return structure
}

const structureTemplate = {
  MASC: [
    {
      topLeft: "NOM",
      topRight: "SG",
    },
    {
      topLeft: "PL",
    },
    {
      topLeft: "GEN",
    },
    {},
    {
      topLeft: "DAT",
    },
    {},
    {
      topLeft: "ACC",
    },
    {},
    {
      topLeft: "ABL",
    },
    {},
  ],
  FEM: [
    {
      topLeft: "NOM",
      topRight: "SG",
    },
    {
      topLeft: "PL",
    },
    {
      topLeft: "GEN",
    },
    {},
    {
      topLeft: "DAT",
    },
    {},
    {
      topLeft: "ACC",
    },
    {},
    {
      topLeft: "ABL",
    },
    {},
  ],
  NEU: [
    {
      topLeft: "NOM",
      topRight: "SG",
    },
    {
      topLeft: "PL",
    },
    {
      topLeft: "GEN",
    },
    {},
    {
      topLeft: "DAT",
    },
    {},
    {
      topLeft: "ACC",
    },
    {},
    {
      topLeft: "ABL",
    },
    {},
  ],
}

const useStyles = makeStyles((theme: any) => ({
  paper: {
    maxWidth: theme.custom.cardWidth,
    borderRadius: 0,
  },
}))
