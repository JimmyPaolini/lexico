// import { Field, ObjectType } from "type-graphql"
// import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
// import Record from "./Record"
// import Word from "./Word"

// @Entity()
// @ObjectType({ implements: Record })
// export default class Form extends Record {
//   @Column()
//   @Field()
//   word: string

//   @Column()
//   @Field()
//   macronized: string

//   @ManyToOne(() => Word, (word) => word.translations, {
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE",
//   })
//   @JoinColumn()
//   @Field(() => Word)
//   root: Word
// }
