import { Field, ObjectType } from "type-graphql"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import Entry from "./Entry"
import Record from "./Record"

@Entity()
@ObjectType({ implements: Record })
export default class Translation extends Record {
  @Column("varchar", { length: 2048 })
  @Field(() => String)
  translation: string

  @ManyToOne(() => Entry, (entry) => entry.translations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Entry)
  entry: Entry

  constructor(translation: string, entry: Entry) {
    super()
    this.translation = translation
    this.entry = entry
  }
}
