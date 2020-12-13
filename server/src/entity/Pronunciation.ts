export class Pronunciation {
  classical: PronunciationParts
  ecclesiastical: PronunciationParts
  vulgar: PronunciationParts

  constructor() {
    return defaultPronunciation
  }
}

export class PronunciationParts {
  phonemes: string
  phonemic: string
  phonetic: string
}

export const defaultPronunciation: Pronunciation = {
  classical: {
    phonemes: "",
    phonemic: "",
    phonetic: "",
  },
  ecclesiastical: {
    phonemes: "",
    phonemic: "",
    phonetic: "",
  },
  vulgar: {
    phonemes: "",
    phonemic: "",
    phonetic: "",
  },
} as Pronunciation
