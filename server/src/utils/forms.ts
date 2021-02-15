import VerbForms from "../entity/dictionary/word/forms/VerbForms"
import { normalize } from "./string"

export function flattenForms(
  obj: object | string[] | undefined | null,
): string[] {
  if (!obj) return []
  if (Array.isArray(obj)) return obj
  return Object.values(obj).reduce(
    (acc, val) => [...acc, ...flattenForms(val)],
    [],
  )
}

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

export function isNumber(str: string) {
  return !!str.match(/^((singular)|(plural))$/i)
}

export function isCase(str: string) {
  return !!str.match(
    /^((nominative)|(genitive)|(dative)|(accusative)|(ablative)|(vocative)|(locative))$/i,
  )
}

export function isGender(str: string) {
  return !!str.match(/^((masculine)|(feminine)|(neuter))$/i)
}

// const formNameAbbreviations: { [key: string]: string } = {
//   "nominative": "NOM",
//   "genitive": "GEN",
//   "dative": "DAT",
//   "accusative": "ACC",
//   "ablative": "ABL",
//   "vocative": "VOC",
//   "locative": "LOC",

//   "masculine": "MASC",
//   "feminine": "FEM",
//   "neuter": "NEU",

//   "singular": "SG",
//   "plural": "PL",

//   "indicative": "IND",
//   "subjunctive": "SUB",
//   "imperative": "IMP",
//   "infinitive": "INFF",
//   "non finite": "NONF",

//   "present": "PRES",
//   "imperfect": "IMP",
//   "future": "FUT",
//   "perfect": "PERF",
//   "pluperfect": "PLUP",
//   futp: "FUTP",

//   "active": "ACT",
//   "passive": "PAS",

//   "first": "1ST",
//   "second": "2ND",
//   "third": "3RD",
// }
