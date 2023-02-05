import { Field, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm'

import Entry from './Entry'

@Entity()
@ObjectType()
@InputType('WordInput')
export default class Word extends BaseEntity {
  @PrimaryColumn()
  @Field()
  word: string

  @ManyToMany(() => Entry, (entry) => entry.words, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  @Field(() => [Entry])
  entries: Entry[]
}
