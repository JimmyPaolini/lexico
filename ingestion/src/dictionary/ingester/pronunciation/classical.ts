export default function getClassicalPhonemes(wordString: string): string {
  for (const [i, j] of Object.entries(substitutions))
    wordString = wordString.replace(new RegExp(i), j)
  const word = wordString.toLowerCase().split('')
  const isVowel = (i: number) =>
    i >= 0 && i < word.length && 'aeiouāēīōūȳ'.split('').includes(word[i])

  const phonemes: string[] = []
  for (let i = 0; i < word.length; i++) {
    if (word[i] === 'h') {
      if (i === 0 || (isVowel(i + 1) && i - 1 >= 0 && word[i - 1] !== 'r'))
        phonemes.push('H')
    } else if (word[i] === 'i') {
      if (isVowel(i + 1) && (i === 0 || isVowel(i - 1))) phonemes.push('J')
      else phonemes.push(classicalPhonemes[word[i]])
    } else if (word[i] === 'j') {
      if (!isVowel(i - 1) && ['l', 'm', 'n', 'q', 't'].includes(word[i - 1]))
        phonemes.push('I')
      else phonemes.push(classicalPhonemes[word[i]])
    } else if (word[i] === 'n') {
      if (!isVowel(i + 1) && ['c', 'g', 'q', 'x'].includes(word[i + 1]))
        phonemes.push('NG')
      else phonemes.push(classicalPhonemes[word[i]])
    } else if (Object.keys(devocalize).includes(word[i])) {
      if (
        i + 1 < word.length &&
        ['c', 'f', 'k', 'p', 'q', 's', 't'].includes(word[i + 1])
      )
        phonemes.push(devocalize[word[i]])
      else phonemes.push(classicalPhonemes[word[i]])
    } else if (
      i + 2 < word.length &&
      classicalPhonemes[word[i] + word[i + 1] + word[i + 2]]
    ) {
      phonemes.push(classicalPhonemes[word[i] + word[++i] + word[++i]])
    } else if (i + 1 < word.length && classicalPhonemes[word[i] + word[i + 1]])
      phonemes.push(classicalPhonemes[word[i] + word[++i]])
    else phonemes.push(classicalPhonemes[word[i]])
  }
  return phonemes.join(' ')
}

const classicalPhonemes: { [key: string]: string } = {
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

const devocalize: { [key: string]: string } = { b: 'p', d: 't', g: 'k', z: 's' }
