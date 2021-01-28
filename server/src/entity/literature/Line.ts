import { Field, ID, ObjectType } from "type-graphql"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import Text from "./Text"

@Entity()
@ObjectType()
export default class Line {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column("varchar", { length: 4095 })
  @Field()
  line!: string

  @Column()
  @Field()
  lineNumber!: number

  @ManyToOne(() => Text, (text) => text.lines, { eager: true })
  @Field(() => Text)
  text: Text
}
