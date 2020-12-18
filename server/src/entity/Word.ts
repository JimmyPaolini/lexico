import { Field, ObjectType } from "type-graphql"
import { Column, Entity, JoinTable, ManyToMany } from "typeorm"
import Entry from "./Entry"
import Record from "./Record"

@Entity()
@ObjectType({ implements: Record })
export default class Word extends Record {
  @Column()
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
