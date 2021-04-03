import VerbForms from "../../../entity/dictionary/word/forms/VerbForms"
import { normalize } from "../../../utils/string"

export function camelCaseFuturePerfect(forms: VerbForms) {
  const futp =
    Object.keys(forms?.indicative?.active || {}).find((tense) =>
      tense.match(/future\s?perfect/i),
    ) || ""
  if (forms.indicative?.active && futp in forms.indicative?.active) {
    forms.indicative.active.futurePerfect = (forms.indicative?.active as any)?.[
      futp
    ]
  }
  if (forms.indicative?.passive && futp in forms.indicative?.passive) {
    forms.indicative.passive.futurePerfect = (forms.indicative
      ?.passive as any)?.[futp]
  }
  return forms
}

export function identifyWord(
  word: string,
  forms: any,
  current: string[],
  identifiers: string[],
) {
  if (Array.isArray(forms)) {
    if (
      forms.some((form) =>
        normalize(form).match(new RegExp("^" + word + "$", "i")),
      )
    ) {
      return [...identifiers, current.join(" ")]
    }
  } else {
    for (const key in forms) {
      identifiers = identifyWord(
        word,
        forms[key],
        [...current, key],
        identifiers,
      )
    }
  }
  return identifiers
}
