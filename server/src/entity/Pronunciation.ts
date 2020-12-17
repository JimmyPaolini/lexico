import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class PronunciationParts {
  @Field()
  phonemes: string

  @Field()
  phonemic: string

  @Field()
  phonetic: string
}

@ObjectType()
export class Pronunciation {
  @Field(() => PronunciationParts)
  classical: PronunciationParts

  @Field(() => PronunciationParts)
  ecclesiastical: PronunciationParts

  @Field(() => PronunciationParts)
  vulgar: PronunciationParts

  constructor() {
    return defaultPronunciation
  }
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
