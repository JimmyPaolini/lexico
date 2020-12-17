import { Field, ObjectType } from "type-graphql"
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm"
import FormsUnion, { Forms } from "./forms/Forms"
import PrincipalPart from "./PrincipalPart"
import { Pronunciation } from "./Pronunciation"
import Record from "./Record"
import Translation from "./Translation"

@Entity()
@ObjectType({ implements: Record })
export default class Word extends Record {
  @Column()
  @Field()
  word: string

  @ManyToMany(() => Word, (word) => word.roots, {
    cascade: ["insert", "update", "recover", "soft-remove"],
  })
  @JoinTable()
  @Field(() => Word)
  roots: Word[]

  @Column("varchar", { length: 16, nullable: true })
  @Field(() => String)
  partOfSpeech: PartOfSpeech

  @Column("varchar", { length: 1028, nullable: true })
  @Field(() => String)
  inflection?: Inflection

  @Column("json", { nullable: true })
  @Field(() => [PrincipalPart])
  principalParts?: PrincipalPart[]

  @OneToMany(() => Translation, (translation) => translation.word, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @Field(() => [Translation])
  translations?: Translation[]

  @Column("json", { nullable: true })
  @Field(() => FormsUnion, { nullable: true })
  forms?: Forms | null

  @Column("json", { nullable: true })
  @Field(() => Pronunciation)
  pronunciation?: Pronunciation

  @Column("varchar", { length: 1028, nullable: true })
  @Field(() => String)
  etymology?: string

  @ManyToMany(() => Word, (word) => word.synonyms)
  @JoinTable()
  @Field(() => [Word])
  synonyms?: Word[]

  @ManyToMany(() => Word, (word) => word.antonyms)
  @JoinTable()
  @Field(() => [Word])
  antonyms?: Word[]
}
