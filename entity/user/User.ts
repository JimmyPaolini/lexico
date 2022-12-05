import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Entry from '../dictionary/Entry'
import CustomText from '../literature/CustomText'
import Settings from './Settings'

@Entity()
@ObjectType()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @CreateDateColumn()
  @Field()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  @Field()
  updatedAt: Date

  @Column()
  @Field()
  email: string

  @Column({ nullable: true, enum: ['google', 'facebook'] })
  @Field({ nullable: true })
  provider: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  providerId?: string

  @ManyToMany(() => Entry, (entry) => entry.users, { nullable: true })
  @JoinTable()
  @Field(() => [Entry], { nullable: true })
  bookmarks?: Entry[]

  @OneToMany(() => CustomText, (customText) => customText.user, {
    nullable: true,
    cascade: true,
  })
  @Field(() => [CustomText], { nullable: true })
  customTexts?: CustomText[]

  @Column('json', { default: new Settings() })
  @Field(() => Settings, { defaultValue: new Settings() })
  settings: Settings = new Settings()
}
