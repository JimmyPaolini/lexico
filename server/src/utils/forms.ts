import VerbForms from "../../../entity/dictionary/word/forms/VerbForms"

export function camelCaseFuturePerfect(forms: VerbForms): VerbForms {
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
    forms.indicative.passive.futurePerfect = (
      forms.indicative?.passive as never
    )?.[futp]
  }
  return forms
}
