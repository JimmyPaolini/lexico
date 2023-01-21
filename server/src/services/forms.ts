import VerbForms from '../entity/dictionary/word/forms/VerbForms'
import { IndicativeTense } from '../entity/dictionary/word/forms/verbForms/Indicative'
import { dedupe } from './array'
import { normalize } from './string'

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

export function getWordForms(word: string, forms: object | string[]): string[] {
  if (Array.isArray(forms)) {
    return forms.filter((form) => normalize(form) === normalize(word))
  } else {
    if (!forms || !Object.values(forms).length) return []
    return dedupe(
      Object.values(forms).flatMap((forms) =>
        getWordForms(word, forms as object | string[])
      )
    )
  }
}
