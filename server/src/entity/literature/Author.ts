import { Field, ObjectType } from "type-graphql"
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import Work from "./Work"

@Entity()
@ObjectType()
export default class Author {
  @PrimaryColumn()
  @Field()
  name: string

  @Column("varchar", { length: 64 })
  @Field()
  nickname: string

  @OneToMany(() => Work, (text) => text.author, {
    cascade: true,
  })
  @Field(() => [Work])
  works: Work[]
}
