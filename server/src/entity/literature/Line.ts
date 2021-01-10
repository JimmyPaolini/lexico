import { Field, ID, ObjectType } from "type-graphql"
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import Author from "./Author"
import Text from "./Text"

@Entity()
@ObjectType()
export default class Line {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column()
  @Field()
  lineNumber!: number

  @Column("varchar", { length: 4095 })
  @Field()
  line!: string

  @Column("varchar", { length: 4095, nullable: true })
  @Field({ nullable: true })
  comments?: string

  @ManyToOne(() => Author, {
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Author)
  author: Author

  @ManyToOne(() => Text, (text) => text.lines, {
    onUpdate: "CASCADE",
  })
  @Field(() => Text)
  text: Text
}
