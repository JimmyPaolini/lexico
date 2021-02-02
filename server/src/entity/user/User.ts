import { Length } from "class-validator"
import { Field, ID, ObjectType } from "type-graphql"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import Entry from "../dictionary/Entry"
import Line from "../literature/Line"
import Settings from "./Settings"

@Entity()
@ObjectType()
export default class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  @CreateDateColumn()
  @Field()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  @Field()
  updatedAt: Date

  @Column({ nullable: true, unique: true })
  @Field({ nullable: true })
  @Length(4, 32)
  email: string

  @Column({ nullable: true })
  @Length(8, 64)
  password: string

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  googleId: string

  @ManyToMany(() => Entry, (entry) => entry.users, { nullable: true })
  @JoinColumn()
  @Field(() => [Entry], { nullable: true })
  bookmarks?: Entry[]

  @ManyToMany(() => Line, (line) => line.users, { nullable: true })
  @JoinColumn()
  @Field(() => [Line], { nullable: true })
  readings?: Line[]

  @Column("json", { nullable: true })
  @Field(() => Settings, { nullable: true })
  settings?: Settings
}
