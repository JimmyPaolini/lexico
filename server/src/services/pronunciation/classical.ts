export function getClassicalPhonemes(word: string): string {
  for (const [str, substitute] of Object.entries(substitutions)) {
    word = word.replace(new RegExp(str), substitute)
  }
  const letters = word.toLowerCase().split('')
  const isVowel = (i: number) =>
    i >= 0 && i < letters.length && 'aeiouāēīōūȳ'.split('').includes(letters[i])

  const phonemes: string[] = []
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === 'h') {
      if (i === 0 || (isVowel(i + 1) && i - 1 >= 0 && letters[i - 1] !== 'r')) {
        phonemes.push('H')
      }
    } else if (letters[i] === 'i') {
      if (isVowel(i + 1) && (i === 0 || isVowel(i - 1))) phonemes.push('J')
      else phonemes.push(classicalPhonemes[letters[i]])
    } else if (letters[i] === 'j') {
      if (
        !isVowel(i - 1) &&
        ['l', 'm', 'n', 'q', 't'].includes(letters[i - 1])
      ) {
        phonemes.push('I')
      } else phonemes.push(classicalPhonemes[letters[i]])
    } else if (letters[i] === 'n') {
      if (!isVowel(i + 1) && ['c', 'g', 'q', 'x'].includes(letters[i + 1])) {
        phonemes.push('NG')
      } else phonemes.push(classicalPhonemes[letters[i]])
    } else if (Object.keys(devocalize).includes(letters[i])) {
      if (
        i + 1 < letters.length &&
        ['c', 'f', 'k', 'p', 'q', 's', 't'].includes(letters[i + 1])
      ) {
        phonemes.push(devocalize[letters[i]])
      } else phonemes.push(classicalPhonemes[letters[i]])
    } else if (
      i + 2 < letters.length &&
      classicalPhonemes[letters[i] + letters[i + 1] + letters[i + 2]]
    ) {
      console.log('THERE', letters[i])
      phonemes.push(classicalPhonemes[letters[i] + letters[++i] + letters[++i]])
    } else if (
      i + 1 < letters.length &&
      classicalPhonemes[letters[i] + letters[i + 1]]
    ) {
      phonemes.push(classicalPhonemes[letters[i] + letters[++i]])
    } else phonemes.push(classicalPhonemes[letters[i]])
  }
  return phonemes.join(' ').toLowerCase()
}

const classicalPhonemes: Record<string, string> = {
  // first array lists possibilities, nested array lists sequence of phonemes
  b: 'B',
  c: 'K',
  d: 'D',
  f: 'F',
  g: 'G',
  j: 'J',
  k: 'K',
  l: 'L',
  m: 'M',
  n: 'N',
  p: 'P',
  q: 'KW',
  r: 'R',
  s: 'S',
  t: 'T',
  v: 'W',
  w: 'W',
  x: 'KS',
  z: 'Z',
  // vowels
  a: 'A',
  ā: 'AA',
  e: 'E',
  ē: 'EE',
  i: 'I',
  ī: 'II',
  o: 'O',
  ō: 'OO',
  u: 'U',
  ū: 'UU',
  y: 'Y',
  ȳ: 'YY',
  // diphthongs
  ae: 'AE',
  oe: 'OE',
  au: 'AU',
  eu: 'EU', // ui: ['ui', ['u', 'i']],
  ' ': '_',
  '.': '_', // space (also for abbreviations)
  '-': '', // dash for tackons
}
const substitutions = {
  iace: 'jace',
  iacē: 'jacē',
  iact: 'jact',
  iacu: 'jacu',
  iect: 'ject',
  ien: 'jen',
  ier: 'jer',
  io$: 'jo',
  iud: 'jud',
  iue: 'jue',
  iug: 'jug',
  iun: 'jun',
  iur: 'jur',
  iut: 'jut',
  iuv: 'juv',
  iūd: 'jūd',
  iūe: 'jūe',
  iūg: 'jūg',
  iūn: 'jūn',
  iūr: 'jūr',
  iūt: 'jūt',
  iūv: 'jūv',
  qu: 'q',
  th: 't',
  ph: 'p',
  ch: 'c',
  xs: 'x',
}

const devocalize: Record<string, string> = { b: 'p', d: 't', g: 'k', z: 's' }
