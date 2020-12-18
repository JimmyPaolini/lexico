import { Field, ObjectType } from "type-graphql"
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm"
import Record from "./Record"
import Translation from "./Translation"
import { Forms, FormsUnion } from "./word/Forms"
import { Inflection, InflectionUnion } from "./word/Inflection"
import PrincipalPart from "./word/PrincipalPart"
import { Pronunciation } from "./word/Pronunciation"

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

  @Column("varchar", { length: 16 })
  @Field(() => String)
  partOfSpeech: PartOfSpeech

  @Column("json", { nullable: true })
  @Field(() => InflectionUnion, { nullable: true })
  inflection?: Inflection | null

  @Column("json", { nullable: true })
  @Field(() => [PrincipalPart], { nullable: true })
  principalParts?: PrincipalPart[] | null

  @OneToMany(() => Translation, (translation) => translation.word, {
    nullable: true,
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field(() => [Translation], { nullable: true })
  translations?: Translation[] | null

  @Column("json", { nullable: true })
  @Field(() => FormsUnion, { nullable: true })
  forms?: Forms | null

  @Column("json", { nullable: true })
  @Field(() => Pronunciation, { nullable: true })
  pronunciation?: Pronunciation | null

  @Column("varchar", { length: 1028, nullable: true })
  @Field(() => String, { nullable: true })
  etymology?: string | null

  @ManyToMany(() => Word, (word) => word.synonyms)
  @JoinTable()
  @Field(() => [Word])
  synonyms?: Word[]

  @ManyToMany(() => Word, (word) => word.antonyms)
  @JoinTable()
  @Field(() => [Word])
  antonyms?: Word[]
}
