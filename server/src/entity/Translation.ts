import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import Record from "./Record"
import Word from "./Word"

@Entity()
export default class Translation extends Record {
  @Column()
  text: string

  @ManyToOne(() => Word, word => word.translations)
  @JoinColumn()
  word: Word

  constructor(text: string, word: Word) {
    super()
    this.text = text
    this.word = word
  }
}
