import { AdjectiveForms } from 'src/graphql/generated'
import { Gender } from 'src/utils/identifiers'

import { adjectiveFormsTableTemplate } from './adjectiveFormsTableTemplate'

export const adjectiveFormsRestructure = (forms: AdjectiveForms) => {
  const structure = JSON.parse(
    JSON.stringify(adjectiveFormsTableTemplate),
  ) as typeof adjectiveFormsTableTemplate

  function structureGender(struc: typeof structure, gender: Gender) {
    struc[gender][0].centerText =
      forms?.[gender]?.nominative?.singular?.join?.(',\n') ?? '-'
    struc[gender][1].centerText =
      forms?.[gender]?.nominative?.plural?.join?.(',\n') ?? '-'
    struc[gender][2].centerText =
      forms?.[gender]?.genitive?.singular?.join?.(',\n') ?? '-'
    struc[gender][3].centerText =
      forms?.[gender]?.genitive?.plural?.join?.(',\n') ?? '-'
    struc[gender][4].centerText =
      forms?.[gender]?.dative?.singular?.join?.(',\n') ?? '-'
    struc[gender][5].centerText =
      forms?.[gender]?.dative?.plural?.join?.(',\n') ?? '-'
    struc[gender][6].centerText =
      forms?.[gender]?.accusative?.singular?.join?.(',\n') ?? '-'
    struc[gender][7].centerText =
      forms?.[gender]?.accusative?.plural?.join?.(',\n') ?? '-'
    struc[gender][8].centerText =
      forms?.[gender]?.ablative?.singular?.join?.(',\n') ?? '-'
    struc[gender][9].centerText =
      forms?.[gender]?.ablative?.plural?.join?.(',\n') ?? '-'

    if (forms?.[gender]?.vocative) {
      struc[gender].splice(
        struc[gender].length,
        0,
        {
          topLeftText: 'vocative',
          topRightText: 'singular',

          centerText: forms?.[gender]?.vocative?.singular?.join(',\n') ?? '-',
        },
        {
          topLeftText: 'vocative',
          topRightText: 'plural',
          centerText: forms?.[gender]?.vocative?.plural?.join(',\n') ?? '-',
        },
      )
    }

    if (forms?.[gender]?.locative) {
      struc[gender].splice(
        struc[gender].length,
        0,
        {
          topLeftText: 'locative',
          topRightText: 'singular',
          centerText: forms?.[gender]?.locative?.singular?.join(',\n') ?? '-',
        },
        {
          topLeftText: 'locative',
          topRightText: 'plural',
          centerText: forms?.[gender]?.locative?.plural?.join(',\n') ?? '-',
        },
      )
    }
  }

  structureGender(structure, 'masculine')
  structureGender(structure, 'feminine')
  structureGender(structure, 'neuter')

  // for (const gen of Object.keys(structure) as Gender[]) {
  //   if (structure[gen].every((cell: any) => !cell.centerText))
  //     delete structure[gen]
  // }

  return structure
}
