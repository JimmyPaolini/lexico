/* spellchecker: disable */
export function normalize(str: string) {
  if (!str) return ""
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function pascalCase(str: string) {
  if (!str) return ""
  return str.replace(
    /(\w)(\w*)/g,
    (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
  )
}

export function sentenceCase(str: string) {
  if (!str) return ""
  return str.replace(
    /(\w)(\w*)/g,
    (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase() + " ",
  )
}

export function getFirstLetter(word: string) {
  const [l1, l2] = [...word.toLowerCase()]
  if (!l1.match(/[a-z-]/) && !l1.match(/[a-z-]/)) return "*"
  if (l1 === "-") return l2
  else return l1
}

export function escapeCapitals(str: string) {
  return str
    .split("")
    .map((c: string) => (c.match(/[A-Z]/g) ? c + "`" : c))
    .join("")
}

export function unescapeCapitals(str: string) {
  return str.replace(/([A-Z])`/, "$1")
}

export const translationSkipRegex = new RegExp(
  /(alternative)|(alternate)|(abbreviation)|(initialism)|(archaic)|(synonym)|(clipping)|(spelling)/gi,
)

export function unabbreviateText(text: string) {
  return text
    .replace(/Agr\./gi, "agrippa")
    .replace(/Ap\./gi, "appius")
    .replace(/A\./gi, "aulus")
    .replace(/K\./gi, "caeso")
    .replace(/D\./gi, "decimo")
    .replace(/F\./gi, "faustus")
    .replace(/C\./gi, "gaius")
    .replace(/Gn\./gi, "gnaeus")
    .replace(/L\./gi, "lucius")
    .replace(/Mam\./gi, "mamercus")
    .replace(/M'\./gi, "manius")
    .replace(/M\./gi, "marcus")
    .replace(/N\./gi, "numerius")
    .replace(/O\./gi, "octavius")
    .replace(/Opt\./gi, "opiter")
    .replace(/Post\./gi, "postumus")
    .replace(/Pr\./gi, "proculus")
    .replace(/P\./gi, "publius")
    .replace(/A\./gi, "quintus")
    .replace(/Sert\./gi, "sertor")
    .replace(/Ser\./gi, "servius")
    .replace(/Sex\./gi, "sextus")
    .replace(/Ti\./gi, "tiberius")
    .replace(/T\./gi, "titus")
    .replace(/V\./gi, "vibius")
    .replace(/Vol\./gi, "volesus")
    .replace(/Vop\./gi, "vopiscus")
}
