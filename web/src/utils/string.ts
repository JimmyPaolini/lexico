export function normalize(str: string): string {
  if (!str) return ""
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
}

export function capitalizeFirstLetter(str: string): string {
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
  return str
    .split(" ")
    .map((s) => pascalCase(s))
    .join(" ")
}

export function unCamelCase(str: string) {
  if (!str) return ""
  return str.replace(
    /[A-Z]/g,
    (upperCaseLetter) => " " + upperCaseLetter.toLowerCase(),
  )
}

export function getFirstLetter(word: string) {
  const [l1, l2] = [...word.toLowerCase()]
  if (!l1.match(/[a-z-]/) && !l1.match(/[a-z-]/)) return "*"
  if (l1 === "-") return l2
  else return l1
}

export function escapeCapitals(str: string): string {
  return str
    .split("")
    .map((c: string) => (c.match(/[A-Z]/g) ? c + "`" : c))
    .join("")
}

export function unescapeCapitals(str: string): string {
  return str.replace(/([A-Z])`/, "$1")
}

export function hasSuffix(str: string, suffix: string) {
  return str.match(new RegExp(suffix + "$", "i"))
}

export const translationSkipRegex = new RegExp(
  /(alternative)|(alternate)|(abbreviation)|(initialism)|(archaic)|(synonym)|(clipping)|(spelling)/gi,
)

export function getMacronOptionRegex(str: string) {
  return str
    .replace(/a/g, "(a|ā)")
    .replace(/A/g, "(A|Ā)")
    .replace(/e/g, "(e|ē)")
    .replace(/E/g, "(E|Ē)")
    .replace(/i/g, "(i|ī)")
    .replace(/I/g, "(I|Ī)")
    .replace(/o/g, "(o|ō)")
    .replace(/O/g, "(O|Ō)")
    .replace(/u/g, "(u|ū)")
    .replace(/U/g, "(U|Ū)")
    .replace(/y/g, "(y|ȳ)")
    .replace(/Y/g, "(Y|Ȳ)")
}

export function validateLetters(letters: string[]): void {
  for (const letter of letters) {
    if (!letter.match(/[a-z]/i)) throw new Error("invalid letter")
  }
}

export function unabbreviateText(text: string): string {
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

export function validateEmail(email: string) {
  return email.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  )
}

export function validatePassword(password: string) {
  return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
}
