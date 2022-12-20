import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'

import User from '../user/User'
import Translation from './Translation'
import Word from './Word'
import { Forms, FormsUnion } from './word/Forms'
import { Inflection, InflectionUnion } from './word/Inflection'
import { PartOfSpeech } from './word/PartOfSpeech'
import PrincipalPart from './word/PrincipalPart'
import { Pronunciation } from './word/Pronunciation'

@Entity()
@ObjectType()
export default class Entry extends BaseEntity {
  @PrimaryColumn('varchar', { length: 127, unique: true })
  @Field(() => ID)
  id: string // = word + ":" + number

  @Column('varchar', { length: 32 })
  @Field(() => String)
  partOfSpeech: PartOfSpeech

  @Column('json', { nullable: true })
  @Field(() => [PrincipalPart], { nullable: true })
  principalParts: PrincipalPart[] | null

  @Column('json', { nullable: true })
  @Field(() => InflectionUnion, { nullable: true })
  inflection?: Inflection | null

  @OneToMany(() => Translation, (translation) => translation.entry, {
    nullable: true,
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => [Translation], { nullable: true })
  translations?: Translation[] | null

  @Column('json', { nullable: true })
  @Field(() => FormsUnion, { nullable: true })
  forms?: Forms | null

  @ManyToMany(() => Word, (word) => word.entries)
  @Field(() => [Word])
  words?: Word[]

  @Column('json', { nullable: true })
  @Field(() => Pronunciation, { nullable: true })
  pronunciation?: Pronunciation

  @Column('varchar', { length: 1027, nullable: true })
  @Field(() => String, { nullable: true })
  etymology?: string

  @ManyToMany(() => User, (user) => user.bookmarks, { nullable: true })
  @Field(() => [User], { nullable: true })
  users?: User[]

  @Field(() => [String], { nullable: true })
  identifiers?: string[]

  @Field(() => Boolean, { nullable: true })
  bookmarked?: boolean

  @Field(() => Boolean, { nullable: true })
  isLatinSearchResult?: boolean
}
