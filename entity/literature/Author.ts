import { Field, ObjectType } from "type-graphql"
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import Book from "./Book"
import Text from "./Text"

@Entity()
@ObjectType()
export default class Author {
  @PrimaryColumn("varchar", { length: 64 })
  @Field()
  name!: string

  @Column("varchar", { length: 64 })
  @Field()
  fullname!: string

  @OneToMany(() => Book, (book) => book.author, {
    cascade: true,
    nullable: true,
  })
  @Field(() => [Book], { nullable: true })
  books?: Book[]

  @OneToMany(() => Text, (text) => text.author, { cascade: true })
  @Field(() => [Text])
  texts: Text[]
}
