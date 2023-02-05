import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('PronunciationPartsInput')
export class PronunciationParts {
  @Field(() => String)
  phonemes = ''

  @Field(() => String)
  phonemic = ''

  @Field(() => String)
  phonetic = ''
}

@ObjectType()
@InputType('PronunciationInput')
export class Pronunciation {
  @Field(() => PronunciationParts)
  classical: PronunciationParts = new PronunciationParts()

  @Field(() => PronunciationParts)
  ecclesiastical: PronunciationParts = new PronunciationParts()

  @Field(() => PronunciationParts)
  vulgar: PronunciationParts = new PronunciationParts()
}
