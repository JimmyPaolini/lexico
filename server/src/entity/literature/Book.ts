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
import Text from "./Text"

@Entity()
@ObjectType()
export default class Book {
  @PrimaryColumn()
  @Field()
  title: string

  @Column("date", { nullable: true })
  @Field(() => Date, { nullable: true })
  publishDate?: Date

  @OneToMany(() => Text, (work) => work.author, {
    cascade: true,
  })
  @Field(() => [Text])
  texts: Text[]

  @ManyToOne(() => Author, (author) => author.books, {
    eager: true,
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Author)
  author: Author
}
