import { Field, ID, ObjectType } from "type-graphql"
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import User from "../user/User"

@Entity()
@ObjectType()
export default class CustomText {
  @PrimaryColumn()
  @Field(() => ID)
  id!: string

  @Column("varchar", { length: 100 })
  @Field()
  title!: string

  @Column("varchar", { length: 100000 })
  @Field()
  text!: string

  @ManyToOne(() => User, (user) => user.customTexts, { eager: true })
  @Field(() => User)
  user!: User
}
