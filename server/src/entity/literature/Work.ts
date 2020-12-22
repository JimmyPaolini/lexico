import { Field, ObjectType } from "type-graphql"
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm"
import Author from "./Author"
import Line from "./Line"

@Entity()
@ObjectType()
export default class Work {
  @PrimaryColumn()
  @Field()
  name: string

  @ManyToOne(() => Author, (author) => author.works, {
    eager: true,
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Author)
  author: Author

  @OneToMany(() => Line, (line) => line.work, {
    eager: true,
    cascade: true
  })
  @Field(() => [Line])
  lines: Line[]
}
