import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'

import Author from './Author'
import Text from './Text'

@Entity()
@ObjectType()
export default class Book extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id!: string

  @Column('varchar', { length: 64 })
  @Field()
  title!: string

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  @JoinColumn()
  @Field(() => Author)
  author: Author

  @OneToMany(() => Text, (text) => text.book, { cascade: true })
  @Field(() => [Text])
  texts: Text[]
}
