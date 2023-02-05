import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'

import User from '../user/User'
import Translation from './Translation'
import Word from './Word'
import { Forms, FormsUnion } from './word/Forms'
import { Inflection, InflectionUnion } from './word/Inflection'
import { PartOfSpeech } from './word/PartOfSpeech'
import PrincipalPart from './word/PrincipalPart'
import { Pronunciation } from './word/Pronunciation'
import AdjectiveForms from './word/forms/AdjectiveForms'
import AdverbForms from './word/forms/AdverbForms'
import NounForms from './word/forms/NounForms'
import VerbForms from './word/forms/VerbForms'
import AdjectiveInflection from './word/inflection/AdjectiveInflection'
import AdverbInflection from './word/inflection/AdverbInflection'
import NounInflection from './word/inflection/NounInflection'
import PrepositionInflection from './word/inflection/PrepositionInflection'
import Uninflected from './word/inflection/Uninflected'
import VerbInflection from './word/inflection/VerbInflection'

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

@InputType('NounEntryInput')
export class NounEntry extends Entry {
  @Column('json', { nullable: true })
  @Field(() => NounInflection, { nullable: true })
  inflection?: NounInflection | null

  @Column('json', { nullable: true })
  @Field(() => NounForms, { nullable: true })
  forms?: NounForms | null
}

@InputType('VerbEntryInput')
export class VerbEntry extends Entry {
  @Column('json', { nullable: true })
  @Field(() => VerbInflection, { nullable: true })
  inflection?: VerbInflection | null

  @Column('json', { nullable: true })
  @Field(() => VerbForms, { nullable: true })
  forms?: VerbForms | null
}

@InputType('AdjectiveEntryInput')
export class AdjectiveEntry extends Entry {
  @Column('json', { nullable: true })
  @Field(() => AdjectiveInflection, { nullable: true })
  inflection?: AdjectiveInflection | null

  @Column('json', { nullable: true })
  @Field(() => AdjectiveForms, { nullable: true })
  forms?: AdjectiveForms | null
}

@InputType('AdverbEntryInput')
export class AdverbEntry extends Entry {
  @Column('json', { nullable: true })
  @Field(() => AdverbInflection, { nullable: true })
  inflection?: AdverbInflection | null

  @Column('json', { nullable: true })
  @Field(() => AdverbForms, { nullable: true })
  forms?: AdverbForms | null
}

@InputType('PrepositionEntryInput')
export class PrepositionEntry extends Entry {
  @Column('json', { nullable: true })
  @Field(() => PrepositionInflection, { nullable: true })
  inflection?: PrepositionInflection | null

  @Column('json', { nullable: true })
  @Field(() => NounForms, { nullable: true })
  forms?: null
}

@InputType('UninflectedEntryInput')
export class UninflectedEntry extends Entry {
  @Column('json', { nullable: true })
  @Field(() => Uninflected, { nullable: true })
  inflection?: Uninflected | null

  @Column('json', { nullable: true })
  @Field(() => NounForms, { nullable: true })
  forms?: null
}