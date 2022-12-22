import VerbForms from '../entity/dictionary/word/forms/VerbForms'
import { IndicativeTense } from '../entity/dictionary/word/forms/verbForms/Indicative'

export function camelCaseFuturePerfect(forms: VerbForms): VerbForms {
  if (forms?.indicative?.active) {
    const key = Object.keys(forms.indicative.active).find((tense) =>
      tense.match(/future\s?perfect/i)
    ) as keyof IndicativeTense
    if (key) {
      forms.indicative.active.futurePerfect = (
        forms.indicative.active as IndicativeTense
      )?.[key]
    }
  }
  if (forms?.indicative?.passive) {
    const key = Object.keys(forms.indicative.passive).find((tense) =>
      tense.match(/future\s?perfect/i)
    ) as keyof IndicativeTense
    if (key) {
      forms.indicative.passive.futurePerfect = (
        forms.indicative.passive as IndicativeTense
      )?.[key]
    }
  }
  return forms
}
