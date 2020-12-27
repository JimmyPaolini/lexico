/* spellchecker: disable */
import { normalize } from "./string"

export default function flattenForms(
  obj: object | string[] | undefined | null,
): string[] {
  if (!obj) return []
  if (Array.isArray(obj)) return obj
  return Object.values(obj).reduce(
    (acc, val) => [...acc, ...flattenForms(val)],
    [],
  )
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
//   "future perfect": "FUTP",

//   "active": "ACT",
//   "passive": "PAS",

//   "first": "1ST",
//   "second": "2ND",
//   "third": "3RD",
// }
