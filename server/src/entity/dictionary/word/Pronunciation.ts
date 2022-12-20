import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PronunciationParts {
  @Field(() => String)
  phonemes = ''

  @Field(() => String)
  phonemic = ''

  @Field(() => String)
  phonetic = ''
}

@ObjectType()
export class Pronunciation {
  @Field(() => PronunciationParts)
  classical: PronunciationParts = new PronunciationParts()

  @Field(() => PronunciationParts)
  ecclesiastical: PronunciationParts = new PronunciationParts()

  @Field(() => PronunciationParts)
  vulgar: PronunciationParts = new PronunciationParts()
}
