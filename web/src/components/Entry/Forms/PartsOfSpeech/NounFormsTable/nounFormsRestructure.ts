import { NounForms } from 'src/graphql/generated'

import { nounFormsTableTemplate } from './nounFormsTableTemplate'

export const nounFormsRestructure = (declensions: NounForms) => {
  const forms = [...nounFormsTableTemplate]
  forms[0].centerText = declensions?.nominative?.singular?.join?.(',\n') ?? '-'
  forms[1].centerText = declensions?.nominative?.plural?.join?.(',\n') ?? '-'
  forms[2].centerText = declensions?.genitive?.singular?.join?.(',\n') ?? '-'
  forms[3].centerText = declensions?.genitive?.plural?.join?.(',\n') ?? '-'
  forms[4].centerText = declensions?.dative?.singular?.join?.(',\n') ?? '-'
  forms[5].centerText = declensions?.dative?.plural?.join?.(',\n') ?? '-'
  forms[6].centerText = declensions?.accusative?.singular?.join?.(',\n') ?? '-'
  forms[7].centerText = declensions?.accusative?.plural?.join?.(',\n') ?? '-'
  forms[8].centerText = declensions?.ablative?.singular?.join?.(',\n') ?? '-'
  forms[9].centerText = declensions?.ablative?.plural?.join?.(',\n') ?? '-'

  if (declensions.vocative) {
    forms.splice(
      forms.length,
      0,
      {
        topLeftText: 'vocative',
        topRightText: 'singular',
        centerText: declensions?.vocative?.singular?.join(',\n') ?? '-',
      },
      {
        topLeftText: 'vocative',
        topRightText: 'plural',
        centerText: declensions?.vocative?.plural?.join(',\n') ?? '-',
      }
    )
  }

  if (declensions.locative) {
    forms.splice(
      forms.length,
      0,
      {
        topLeftText: 'locative',
        topRightText: 'singular',
        centerText: declensions?.locative?.singular?.join(',\n') ?? '-',
      },
      {
        topLeftText: 'locative',
        topRightText: 'plural',
        centerText: declensions?.locative?.plural?.join(',\n') ?? '-',
      }
    )
  }

  return forms
}
