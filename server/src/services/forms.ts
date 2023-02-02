import AdjectiveForms from '../entity/dictionary/word/forms/AdjectiveForms'
import { NounNumber } from '../entity/dictionary/word/forms/NounForms'
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

export function determinerFormsToAdjectiveForms(determinerForms: any) {
  const adjectiveForms = new AdjectiveForms() as any
  for (const gender of ['masculine', 'feminine', 'neuter']) {
    for (const number of ['singular', 'plural']) {
      for (const grammarCase of [
        'nominative',
        'genitive',
        'dative',
        'accusative',
        'ablative',
        'vocative',
        'locative',
      ]) {
        if (!determinerForms?.[grammarCase])
          adjectiveForms[gender][grammarCase] = null
        else
          adjectiveForms[gender][grammarCase][number] =
            determinerForms?.[grammarCase]?.[number]?.[gender] ?? null
      }
    }
  }
  return adjectiveForms as AdjectiveForms
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

export function isDeterminerForms(forms: any) {
  let isDeterminerForms = false
  if (!forms) return isDeterminerForms
  console.log('🐋 ~ isDeterminerForms', isDeterminerForms)
  for (const case_ of Object.keys(forms)) {
    if (
      Object.getOwnPropertyNames(new NounNumber()).some(
        (number) => number in forms[case_]
      )
    ) {
      for (const number of Object.keys(forms[case_])) {
        if (
          Object.getOwnPropertyNames(new AdjectiveForms()).some(
            (gender) => gender in forms[case_][number]
          )
        ) {
          isDeterminerForms = true
        }
      }
    }
  }

  return isDeterminerForms
}

export function flattenForms(
  obj: string[] | Record<string, string[]>
): string[] {
  if (!obj) return []
  if (Array.isArray(obj)) return obj
  return Object.values(obj).reduce(
    (acc, val) => [...acc, ...flattenForms(val)],
    []
  )
}

export function isNumber(str: string): boolean {
  return !!str.match(/^((singular)|(plural))$/i)
}

export function isCase(str: string): boolean {
  return !!str.match(
    /^((nominative)|(genitive)|(dative)|(accusative)|(ablative)|(vocative)|(locative))$/i
  )
}

export function isGender(str: string): boolean {
  return !!str.match(/^((masculine)|(feminine)|(neuter))$/i)
}
