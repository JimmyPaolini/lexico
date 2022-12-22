import { PronunciationParts } from '../../../../../server/src/entity/dictionary/word/Pronunciation'
import getEcclesiasticalPhonemes from './ecclesiastical'

function phonemesToPronunciations(
  phonemes: Array<string | string[][]>
): string[] {
  const pronunciations: string[] = []
  function buildPronunciations(
    prev: Array<string | string[][]>,
    next: Array<string | string[][]>
  ): any {
    if (next.length === 0) return pronunciations.push(prev.join(' '))
    const phoneme = next.shift()
    if (Array.isArray(phoneme)) {
      for (const option of phoneme) {
        if (Array.isArray(option)) {
          buildPronunciations([...prev, ...option], [...next])
        } else buildPronunciations([...prev, option], [...next])
      }
    } else {
      buildPronunciations([...prev, phoneme] as Array<string | string[][]>, [
        ...next,
      ])
    }
  }
  buildPronunciations([], phonemes)
  return pronunciations
}

export function getEcclesiasticalPronunciations(word: string): string[] {
  return phonemesToPronunciations(getEcclesiasticalPhonemes(word))
}

export function parsePhonics(pronunciations: string[]): PronunciationParts {
  const parsed: PronunciationParts = new PronunciationParts()
  for (const pronunciation of pronunciations) {
    if (/\/.*\//.test(pronunciation)) {
      parsed.phonemic = pronunciation.trim()
    } else if (/\[.*\]/.test(pronunciation)) {
      parsed.phonetic = pronunciation.trim()
    }
  }
  return parsed
}
