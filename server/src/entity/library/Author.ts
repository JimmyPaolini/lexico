import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import Book from './Book'
import Text from './Text'

@Entity()
@ObjectType()
export default class Author extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id!: string

  @Column('varchar', { length: 64 })
  @Field()
  name!: string

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
