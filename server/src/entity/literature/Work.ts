import { Arg, Field, ObjectType } from "type-graphql"
import {
  Column,
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
  title: string

  @Column("date", { nullable: true })
  @Field(() => Date, { nullable: true })
  publishDate?: Date

  @ManyToOne(() => Author, (author) => author.works, {
    eager: true,
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Author)
  author: Author

  @OneToMany(() => Line, (line) => line.work, {
    cascade: true,
  })
  @Field(() => [Line])
  lines: Line[]

  @Field(() => [Line])
  linesSlice(
    @Arg("start", { defaultValue: 0 }) start: number = 0,
    @Arg("end", { defaultValue: Number.MAX_VALUE })
    end: number = Number.MAX_VALUE,
  ): Line[] {
    return this.lines.slice(start, end)
  }
}
