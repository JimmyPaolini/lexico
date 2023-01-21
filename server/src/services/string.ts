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
