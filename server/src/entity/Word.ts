import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm"
import { Pronunciation } from "./Pronunciation"
import Record from "./Record"
import Translation from "./Translation"

@Entity()
export default class Word extends Record {
  @Column({ unique: true })
  word: string

  @ManyToMany(() => Word, word => word.roots)
  @JoinTable()
  roots: Word[] | undefined

  @Column({ nullable: true })
  partOfSpeech?: PartOfSpeech

  @Column({ nullable: true })
  inflection?: Inflection

  @Column("json", { nullable: true })
  principalParts?: PrincipalPart[]

  @OneToMany(() => Translation, translation => translation.word, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  translations?: Translation[]

  @Column("json", { nullable: true })
  forms?: Forms

  @Column("json", { nullable: true })
  pronunciation?: Pronunciation

  @Column({ nullable: true })
  etymology?: string

  @ManyToMany(() => Word, word => word.synonyms)
  @JoinTable()
  synonyms?: Word[] | undefined

  @ManyToMany(() => Word, word => word.antonyms)
  @JoinTable()
  antonyms?: Word[] | undefined
}
