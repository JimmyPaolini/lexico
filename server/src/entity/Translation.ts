import { Field, ObjectType } from "type-graphql"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import Entry from "./Entry"
import Record from "./Record"

@Entity()
@ObjectType({ implements: Record })
export default class Translation extends Record {
  @Column("varchar", { length: 2048 })
  @Field(() => String)
  text: string

  @ManyToOne(() => Entry, (entry) => entry.translations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Entry)
  entry: Entry

  constructor(text: string, entry: Entry) {
    super()
    this.text = text
    this.entry = entry
  }
}
