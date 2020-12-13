export type Pronunciation = {
  classical: PronunciationParts
  ecclesiastical: PronunciationParts
  vulgar: PronunciationParts
}

type PronunciationParts = {
  phonemes: string
  phonemic: string
  phonetic: string
}

export const defaultPronunciation = {
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
