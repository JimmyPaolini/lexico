import { Field, ID, ObjectType } from "type-graphql"
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import Entry from "./Entry"

@Entity()
@ObjectType()
export default class Translation {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string

  @Column("varchar", { length: 2047 })
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
    this.translation = translation
    this.entry = entry
  }
}
