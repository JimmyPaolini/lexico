import { Field, ObjectType } from "type-graphql"
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm"
import Author from "./Author"
import Work from "./Work"

@Entity()
@ObjectType()
export default class Book {
  @PrimaryColumn()
  @Field()
  title: string

  @Column("date", { nullable: true })
  @Field(() => Date, { nullable: true })
  publishDate?: Date

  @OneToMany(() => Work, (work) => work.author, {
    cascade: true,
  })
  @Field(() => [Work])
  works: Work[]

  @ManyToOne(() => Author, (author) => author.books, {
    eager: true,
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Author)
  author: Author
}
