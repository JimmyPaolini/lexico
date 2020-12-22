import { Field, ObjectType } from "type-graphql"
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm"
import Entry from "./Entry"

@Entity()
@ObjectType()
export default class Word {
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
