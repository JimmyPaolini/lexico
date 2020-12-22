import { Field, ID, ObjectType } from "type-graphql"
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import Translation from "./Translation"
import Word from "./Word"
import { Forms, FormsUnion } from "./word/Forms"
import { Inflection, InflectionUnion } from "./word/Inflection"
import PrincipalPart from "./word/PrincipalPart"
import { Pronunciation } from "./word/Pronunciation"

@Entity()
@ObjectType()
export default class Entry {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column("varchar", { length: 128 })
  @Field()
  word: string

  @Column("varchar", { length: 16 })
  @Field(() => String)
  partOfSpeech: PartOfSpeech

  @Column("json", { nullable: true })
  @Field(() => [PrincipalPart], { nullable: true })
  principalParts: PrincipalPart[] | null

  @Column("json", { nullable: true })
  @Field(() => InflectionUnion, { nullable: true })
  inflection?: Inflection | null

  @OneToMany(() => Translation, (translation) => translation.entry, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @Field(() => [Translation], { nullable: true })
  translations?: Translation[] | null

  @Column("json", { nullable: true })
  @Field(() => FormsUnion, { nullable: true })
  forms?: Forms | null

  @ManyToMany(() => Word, (word) => word.entries)
  @Field(() => [Word])
  words?: Word[]

  @Column("json", { nullable: true })
  @Field(() => Pronunciation, { nullable: true })
  pronunciation?: Pronunciation

  @Column("varchar", { length: 1028, nullable: true })
  @Field(() => String, { nullable: true })
  etymology?: string | null

  // @ManyToMany(() => Entry, (entry) => entry.synonyms)
  // @JoinTable()
  // @Field(() => [Entry])
  // synonyms?: Entry[]

  // @ManyToMany(() => Entry, (entry) => entry.antonyms)
  // @JoinTable()
  // @Field(() => [Entry])
  // antonyms?: Entry[]
}
