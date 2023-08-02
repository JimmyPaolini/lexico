export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gm, '')
    .replace(/æ/gm, 'ae')
}
/**
 *
 * @param text macronized or unmacronized
 * @returns an array of unmacronized words
 */
export function textToWords(text: string) {
  return normalize(text).match(/\w+/gim) ?? ([] as string[])
}

/**
 *
 * @param text macronized or unmacronized
 * @returns an array of macronized or unmacronized words and nonwords
 */
export function textToTokens(text: string) {
  return text.match(/[\wāēīōūĀĒĪŌŪ]+|[^\wāēīōūĀĒĪŌŪ]+/gim) ?? ([] as string[])
}

/**
 *
 * @param word
 * @returns if input word is a word or a nonword
 */
export function isWord(word: string) {
  return Boolean(word.match(/^[\wāēīōūĀĒĪŌŪ]+$/gim))
}

/**
 *
 * @param text macronized or unmacronized
 * @returns if input text contains macrons or not
 */
export function isMacronized(text: string) {
  return text !== normalize(text)
}

export function combineMacronizedOptions(macronizedOptions: string[]) {
  if (!macronizedOptions.length) return ''
  let result = ''
  for (let i = 0; i < macronizedOptions[0].length; i++) {
    const letters = macronizedOptions.map((macronizedOption) =>
      macronizedOption.charAt(i)
    )
    const isMacronAmbiguous =
      letters.some((letter) => isMacronized(letter)) &&
      letters.some((letter) => !isMacronized(letter))
    result += isMacronAmbiguous ? vowelToUmlaut(letters[0]) : letters[0]
  }
  return result
}

function vowelToUmlaut(text: string) {
  return text
    .replace(/ā|a/gm, 'ä')
    .replace(/ē|e/gm, 'ë')
    .replace(/ī|i/gm, 'ï')
    .replace(/ō|o/gm, 'ö')
    .replace(/ū|u/gm, 'ü')
    .replace(/Ā|A/gm, 'Ä')
    .replace(/Ē|E/gm, 'Ë')
    .replace(/Ī|I/gm, 'Ï')
    .replace(/Ō|O/gm, 'Ö')
    .replace(/Ū|U/gm, 'Ü')
}

export function u2v(text: string) {
  return text
    .replace(/u/gm, 'v')
    .replace(/U/gm, 'V')
    .replace(/ū/gm, 'v̄')
    .replace(/Ū/gm, 'V̄')
}

export function i2j(text: string) {
  return text
    .replace(/i/gm, 'j')
    .replace(/I/gm, 'J')
    .replace(/ī/gm, 'j̄')
    .replace(/Ī/gm, 'J̄')
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function pascalCase(str: string): string {
  if (!str) return ''
  return str.replace(
    /(\w)(\w*)/g,
    (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
  )
}

export function sentenceCase(str: string): string {
  if (!str) return ''
  return str
    .replace(
      /(\w)(\w*)/g,
      (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase() + ' '
    )
    .slice(0, -1)
}

export function getFirstLetter(word: string): string {
  const [l1, l2] = [...word.toLowerCase()]
  if (!l1.match(/[a-z-]/) && !l1.match(/[a-z-]/)) return '*'
  if (l1 === '-') return l2
  else return l1
}

export function escapeCapitals(str: string): string {
  return str
    .split('')
    .map((c: string) => (c.match(/[A-Z]/g) ? c + '`' : c))
    .join('')
}

export function unescapeCapitals(str: string): string {
  return str.replace(/([A-Z])`/, '$1')
}

export function hasSuffix(
  str: string,
  suffix: string
): RegExpMatchArray | null {
  return str.match(new RegExp(suffix + '$', 'i'))
}

export function getMacronOptionRegex(str: string): string {
  return str
    .replace(/a/g, '(a|ā)')
    .replace(/A/g, '(A|Ā)')
    .replace(/e/g, '(e|ē)')
    .replace(/E/g, '(E|Ē)')
    .replace(/i/g, '(i|ī)')
    .replace(/I/g, '(I|Ī)')
    .replace(/o/g, '(o|ō)')
    .replace(/O/g, '(O|Ō)')
    .replace(/u/g, '(u|ū)')
    .replace(/U/g, '(U|Ū)')
    .replace(/y/g, '(y|ȳ)')
    .replace(/Y/g, '(Y|Ȳ)')
}

export function validateLetters(letters: string[]): void {
  for (const letter of letters) {
    if (!letter.match(/[a-z]/i)) throw new Error('invalid letter')
  }
}

export function unabbreviateText(text: string): string {
  return text
    .replace(/Agr\./gi, 'agrippa')
    .replace(/Ap\./gi, 'appius')
    .replace(/A\./gi, 'aulus')
    .replace(/K\./gi, 'caeso')
    .replace(/D\./gi, 'decimo')
    .replace(/F\./gi, 'faustus')
    .replace(/C\./gi, 'gaius')
    .replace(/Gn\./gi, 'gnaeus')
    .replace(/L\./gi, 'lucius')
    .replace(/Mam\./gi, 'mamercus')
    .replace(/M'\./gi, 'manius')
    .replace(/M\./gi, 'marcus')
    .replace(/N\./gi, 'numerius')
    .replace(/O\./gi, 'octavius')
    .replace(/Opt\./gi, 'opiter')
    .replace(/Post\./gi, 'postumus')
    .replace(/Pr\./gi, 'proculus')
    .replace(/P\./gi, 'publius')
    .replace(/A\./gi, 'quintus')
    .replace(/Sert\./gi, 'sertor')
    .replace(/Ser\./gi, 'servius')
    .replace(/Sex\./gi, 'sextus')
    .replace(/Ti\./gi, 'tiberius')
    .replace(/T\./gi, 'titus')
    .replace(/V\./gi, 'vibius')
    .replace(/Vol\./gi, 'volesus')
    .replace(/Vop\./gi, 'vopiscus')
}

export function validateEmail(email: string): RegExpMatchArray | null {
  return email.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  )
}

export function validatePassword(password: string): RegExpMatchArray | null {
  return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
}
