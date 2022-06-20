import { adjectiveFormsTableTemplate } from "./adjectiveFormsTableTemplate"

export const adjectiveFormsRestructure = (forms: any) => {
  // console.log("structureTemplate", structureTemplate);
  const structure = JSON.parse(JSON.stringify(adjectiveFormsTableTemplate))

  function structureGender(struc: any, GEN: any, gender: any) {
    struc[GEN][0].centerText =
      forms?.[gender]?.nominative?.singular?.join?.(",\n")
    struc[GEN][1].centerText =
      forms?.[gender]?.nominative?.plural?.join?.(",\n")
    struc[GEN][2].centerText =
      forms?.[gender]?.genitive?.singular?.join?.(",\n")
    struc[GEN][3].centerText = forms?.[gender]?.genitive?.plural?.join?.(",\n")
    struc[GEN][4].centerText = forms?.[gender]?.dative?.singular?.join?.(",\n")
    struc[GEN][5].centerText = forms?.[gender]?.dative?.plural?.join?.(",\n")
    struc[GEN][6].centerText =
      forms?.[gender]?.accusative?.singular?.join?.(",\n")
    struc[GEN][7].centerText =
      forms?.[gender]?.accusative?.plural?.join?.(",\n")
    struc[GEN][8].centerText =
      forms?.[gender]?.ablative?.singular?.join?.(",\n")
    struc[GEN][9].centerText = forms?.[gender]?.ablative?.plural?.join?.(",\n")

    if (forms?.[gender]?.vocative) {
      struc[GEN].splice(
        struc[GEN].length,
        0,
        {
          topLeftText: "VOC",
          centerText: forms?.[gender]?.vocative?.singular?.join(",\n"),
        },
        {
          centerText: forms?.[gender]?.vocative?.plural?.join(",\n"),
        },
      )
    }

    if (forms?.[gender]?.locative) {
      struc[GEN].splice(
        struc[GEN].length,
        0,
        {
          topLeftText: "LOC",
          centerText: forms?.[gender]?.locative?.singular?.join(",\n"),
        },
        {
          centerText: forms?.[gender]?.locative?.plural?.join(",\n"),
        },
      )
    }
  }

  structureGender(structure, "MASC", "masculine")
  structureGender(structure, "FEM", "feminine")
  structureGender(structure, "NEU", "neuter")

  for (const gen of Object.keys(structure)) {
    if (structure[gen].every((cell: any) => !cell.centerText))
      delete structure[gen]
  }

  return structure
}
