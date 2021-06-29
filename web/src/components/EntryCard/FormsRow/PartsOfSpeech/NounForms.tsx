/* spellchecker: disable */
import { Box, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { Forms } from "../../../../../../entity/dictionary/word/Forms"
import FormsTable from "../FormsTable"

interface Props {
  forms: Forms | null | undefined
}

export default function NounForms({ forms }: Props): JSX.Element {
  const classes = useStyles()
  const formsStructure = nounFormsRestructure(forms)
  return (
    <Paper className={classes.paper} elevation={0}>
      <Box style={{ height: "4px" }} />
      <FormsTable forms={formsStructure} />
    </Paper>
  )
}

const nounFormsRestructure = (declensions: any) => {
  const forms = [...formsTemplate]
  forms[0].center = declensions?.nominative?.singular?.join?.(",\n")
  forms[1].center = declensions?.nominative?.plural?.join?.(",\n")
  forms[2].center = declensions?.genitive?.singular?.join?.(",\n")
  forms[3].center = declensions?.genitive?.plural?.join?.(",\n")
  forms[4].center = declensions?.dative?.singular?.join?.(",\n")
  forms[5].center = declensions?.dative?.plural?.join?.(",\n")
  forms[6].center = declensions?.accusative?.singular?.join?.(",\n")
  forms[7].center = declensions?.accusative?.plural?.join?.(",\n")
  forms[8].center = declensions?.ablative?.singular?.join?.(",\n")
  forms[9].center = declensions?.ablative?.plural?.join?.(",\n")

  if (declensions.vocative) {
    forms.splice(
      forms.length,
      0,
      {
        topLeft: "VOC",
        center: declensions?.vocative?.singular?.join(",\n"),
      },
      {
        center: declensions?.vocative?.plural?.join(",\n"),
      },
    )
  }

  if (declensions.locative) {
    forms.splice(
      forms.length,
      0,
      {
        topLeft: "LOC",
        center: declensions?.locative?.singular?.join(",\n"),
      },
      {
        center: declensions?.locative?.plural?.join(",\n"),
      },
    )
  }

  return forms
}

const formsTemplate: any = [
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
]

const useStyles = makeStyles((theme: any) => ({
  paper: {
    maxWidth: theme.custom.cardWidth,
    borderRadius: 0,
  },
}))
