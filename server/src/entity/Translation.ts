import { Field, ObjectType } from "type-graphql"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import Record from "./Record"
import Word from "./Word"

@Entity()
@ObjectType({ implements: Record })
export default class Translation extends Record {
  @Column()
  @Field(() => String)
  text: string

  @ManyToOne(() => Word, (word) => word.translations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Word)
  word: Word

  constructor(text: string, word: Word) {
    super()
    this.text = text
    this.word = word
  }
}
