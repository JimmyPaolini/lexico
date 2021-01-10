/* spellchecker: disable */
import { Box, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import { Forms } from "../../../../../../server/src/entity/dictionary/word/Forms"
import FormsTable from "../FormsTable"
import FormTabs from "../FormTabs"

interface Props {
  forms: Forms | null | undefined
}

export default function AdjectiveForms({ forms }: Props) {
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
    struc[GEN][0].center = forms?.nominative?.singular?.[gender]?.join?.(",\n")
    struc[GEN][1].center = forms?.nominative?.plural?.[gender]?.join?.(",\n")
    struc[GEN][2].center = forms?.genitive?.singular?.[gender]?.join?.(",\n")
    struc[GEN][3].center = forms?.genitive?.plural?.[gender]?.join?.(",\n")
    struc[GEN][4].center = forms?.dative?.singular?.[gender]?.join?.(",\n")
    struc[GEN][5].center = forms?.dative?.plural?.[gender]?.join?.(",\n")
    struc[GEN][6].center = forms?.accusative?.singular?.[gender]?.join?.(",\n")
    struc[GEN][7].center = forms?.accusative?.plural?.[gender]?.join?.(",\n")
    struc[GEN][8].center = forms?.ablative?.singular?.[gender]?.join?.(",\n")
    struc[GEN][9].center = forms?.ablative?.plural?.[gender]?.join?.(",\n")

    if (forms.vocative) {
      struc[GEN].splice(
        struc[GEN].length,
        0,
        {
          topLeft: "VOC",
          center: forms?.vocative?.singular?.[gender]?.join(",\n"),
        },
        {
          center: forms?.vocative?.plural?.[gender]?.join(",\n"),
        },
      )
    }

    if (forms.locative) {
      struc[GEN].splice(
        struc[GEN].length,
        0,
        {
          topLeft: "LOC",
          center: forms?.locative?.singular?.[gender]?.join(",\n"),
        },
        {
          center: forms?.locative?.plural?.[gender]?.join(",\n"),
        },
      )
    }
  }

  structureGender(structure, "MASC", "masculine")
  structureGender(structure, "FEM", "feminine")
  structureGender(structure, "NEU", "neuter")

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
    width: theme.custom.cardWidth,
    borderRadius: 0,
  },
}))
