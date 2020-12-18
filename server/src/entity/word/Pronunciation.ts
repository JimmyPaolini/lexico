import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class PronunciationParts {
  @Field()
  phonemes: string = ""

  @Field()
  phonemic: string = ""

  @Field()
  phonetic: string = ""
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
