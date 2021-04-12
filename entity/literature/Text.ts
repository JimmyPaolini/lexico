import { Arg, Field, ID, ObjectType } from "type-graphql"
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm"
import Author from "./Author"
import Book from "./Book"
import Line from "./Line"

@Entity()
@ObjectType()
export default class Text {
  @PrimaryColumn()
  @Field(() => ID)
  id!: string

  @Column("varchar", { length: 64 })
  @Field()
  title!: string

  @ManyToOne(() => Author, (author) => author.texts, { eager: true })
  @JoinColumn()
  @Field(() => Author)
  author!: Author

  @ManyToOne(() => Book, (book) => book.texts, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  @Field(() => Book, { nullable: true })
  book?: Book

  @OneToMany(() => Line, (line) => line.text, { cascade: true })
  @Field(() => [Line])
  lines!: Line[]

  @Field(() => [Line])
  linesSlice(
    @Arg("start", { defaultValue: 0 }) start: number = 0,
    @Arg("end", { defaultValue: Number.MAX_VALUE })
    end: number = Number.MAX_VALUE,
  ): Line[] {
    return this.lines
      .sort((l1, l2) => l1.lineNumber - l2.lineNumber)
      .slice(start, end)
  }
}
