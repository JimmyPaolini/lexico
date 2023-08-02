import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import User from '../user/User'

@Entity()
@ObjectType()
export default class CustomText extends BaseEntity {
  @PrimaryColumn('uuid')
  @Field(() => ID)
  id!: string

  @Column('varchar', { length: 100 })
  @Field()
  title!: string

  @Column('varchar', { length: 100000 })
  @Field()
  text!: string

  @ManyToOne(() => User, (user) => user.customTexts, { eager: true })
  @Field(() => User)
  user!: User
}
