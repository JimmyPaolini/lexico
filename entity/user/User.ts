import { Length } from "class-validator"
import { Field, ID, ObjectType } from "type-graphql"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
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
  @PrimaryGeneratedColumn("uuid")
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

  @Column({ nullable: true })
  @Length(8, 64)
  password?: string

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  googleId?: string

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  facebookId?: string

  @ManyToMany(() => Entry, (entry) => entry.users, { nullable: true })
  @JoinTable()
  @Field(() => [Entry], { nullable: true })
  bookmarks?: Entry[]

  @ManyToMany(() => Line, (line) => line.users, { nullable: true })
  @JoinTable()
  @Field(() => [Line], { nullable: true })
  readings?: Line[]

  @Column("json", { default: new Settings() })
  @Field(() => Settings, { defaultValue: new Settings() })
  settings: Settings = new Settings()

  @Column({ nullable: true })
  passwordResetToken?: string
}
