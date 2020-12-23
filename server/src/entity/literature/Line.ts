import { Field, ID, ObjectType } from "type-graphql"
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import Author from "./Author"
import Work from "./Work"

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
  text!: string

  @Column("varchar", { length: 4095, nullable: true })
  @Field({ nullable: true })
  comments?: string

  @ManyToOne(() => Author, (author) => author.works, {
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Author)
  author: Author

  @ManyToOne(() => Work, (work) => work.lines, {
    onUpdate: "CASCADE",
  })
  @Field(() => Work)
  work: Work
}
