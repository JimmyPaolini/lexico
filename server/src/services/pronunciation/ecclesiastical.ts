export default function getEcclesiasticalPhonemes(
  wordString: string
): Array<string | string[][]> {
  const phonemes: Array<string | string[][]> = []
  const isVowel = (letter: string) => ['a', 'e', 'i', 'o', 'u'].includes(letter)
  const word = wordString.split('')
  for (let i = 0; i < word.length; i++) {
    if (word[i] === 'c') {
      if (
        (i + 1 < word.length && ['e', 'i', 'y'].includes(word[i + 1])) ||
        (i + 2 < word.length &&
          ['ae', 'oe'].includes(word[i + 1] + word[i + 2]))
      ) {
        phonemes.push('ch')
      } else if (i + 1 < word.length && word[i + 1] === 'c') {
        phonemes.push('ch')
        i++
      } else phonemes.push('k')
    } else if (word[i] === 'g') {
      if (
        (i + 2 < word.length &&
          ['ae', 'oe'].includes(word[i + 1] + word[i + 2])) ||
        ['e', 'i', 'y'].includes(word[i + 1])
      ) {
        phonemes.push('dg')
      } else if (i + 1 < word.length && word[i + 1] === 'g') {
        phonemes.push('dg')
        i++
      } else phonemes.push('g')
    } else if (word[i] === 'h') {
      if (
        (i - 2 >= 0 &&
          i + 1 < word.length &&
          wordString.slice(i - 2, i + 2) === 'mihi') ||
        (i - 2 >= 0 &&
          i + 2 < word.length &&
          wordString.slice(i - 2, i + 3) === 'nihil')
      ) {
        phonemes.push('k')
      }
    } else if (word[i] === 'i') {
      if (i === 0 && i + 1 < word.length && isVowel(word[i + 1])) {
        phonemes.push('j')
      } else if (
        i - 1 > 0 &&
        i + 1 < word.length &&
        isVowel(word[i - 1]) &&
        isVowel(word[i + 1])
      ) {
        phonemes.push('j')
      } else phonemes.push(ecclesiasticalPhonemes.i)
    } else if (word[i] === 's') {
      if (i > 0 && isVowel(word[i - 1]) && isVowel(word[i + 1])) {
        phonemes.push('z')
      } else if (
        i + 2 < word.length &&
        ['ce', 'ci'].includes(word[i + 1] + word[i + 2])
      ) {
        phonemes.push('sh')
        i++
      } else phonemes.push('s')
      if (word[i + 1] === 's') i++
    } else if (word[i] === 't') {
      if (word[i + 1] === 'i') phonemes.push('ts')
      else phonemes.push('t')
    } else if (word[i] === 'x') {
      if (i > 0 && isVowel(word[i - 1]) && isVowel(word[i + 1])) {
        phonemes.push('gz')
      } else if (
        i + 2 < word.length &&
        ['ce', 'ci'].includes(word[i + 1] + word[i + 2])
      ) {
        phonemes.push('ksh')
        i++
      } else phonemes.push('ks')
    } else if (ecclesiasticalPhonemes[word[i] + word[i + 1]]) {
      phonemes.push(ecclesiasticalPhonemes[word[i] + word[++i]])
    } else phonemes.push(ecclesiasticalPhonemes[word[i]])
  }
  return phonemes
}

const ecclesiasticalPhonemes: Record<string, string | string[][]> = {
  // first array lists possibilities, nested array lists sequence of phonemes
  b: 'b',
  // c is sometimes softened to ch
  d: 'd',
  f: 'f',
  // g is often softened to j
  gn: 'gn',
  // h is often omitted
  // i is a consonant 'j' if at the beginning or surrounded by vowels
  k: 'k',
  l: 'l',
  m: 'm',
  n: 'n',
  ng: [['ng', 'g']],
  nc: [['ng', 'k']],
  nq: [['ng', 'q']],
  nx: [['ng', 'ks']],
  p: 'p',
  ph: 'f',
  qu: 'kw',
  r: 'r',
  // s becomes z between vowels
  // t can become italian ts
  v: 'v',
  // x can be ks, gz, or some sh sound
  z: 'dz',
  // vowels
  a: 'a:',
  ā: 'a:',
  e: 'e:',
  ē: 'e:',
  i: 'i:',
  ī: 'i:',
  o: 'o:',
  ō: 'o:',
  u: 'u:',
  ū: 'u:',
  y: 'y:',
  ȳ: 'y:',
  // diphthongs
  ae: 'e',
  oe: 'e',
  au: 'au',
  eu: 'eu',
  ei: 'ei',
  ui: 'ui',
  // space
  ' ': '_',
}
