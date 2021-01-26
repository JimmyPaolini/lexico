import { Field, ID, ObjectType } from "type-graphql"
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import Author from "./Author"
import Text from "./Text"

@Entity()
@ObjectType()
export default class Book {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

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
