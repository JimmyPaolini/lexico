import { Field, ID, ObjectType } from "type-graphql"
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import User from "../user/User"
import Text from "./Text"

@Entity()
@ObjectType()
export default class Line {
  @PrimaryColumn()
  @Field(() => ID)
  id!: string

  @Column("varchar")
  @Field()
  line!: string

  @Column()
  @Field()
  lineNumber!: number

  @Column("varchar", { length: 16 })
  @Field()
  lineLabel!: string

  @ManyToOne(() => Text, (text) => text.lines, { eager: true })
  @Field(() => Text)
  text: Text

  @ManyToMany(() => User, (user) => user.readings, { nullable: true })
  @Field(() => [User], { nullable: true })
  users?: User[]
}
