import { Field, ID, InterfaceType } from "type-graphql"
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
@InterfaceType()
export default abstract class Record {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @CreateDateColumn()
  @Field()
  createdAt: Date

  @UpdateDateColumn()
  @Field()
  updatedAt: Date
}
