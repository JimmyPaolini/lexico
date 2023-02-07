import { Field, ObjectType } from 'type-graphql'

import Imperative from './verbForms/Imperative'
import Indicative from './verbForms/Indicative'
import NonFinite from './verbForms/NonFinite'
import Subjunctive from './verbForms/Subjunctive'
import VerbalNoun from './verbForms/VerbalNoun'

@ObjectType()
export default class VerbForms {
  @Field(() => Indicative, { nullable: true })
  indicative?: Indicative = new Indicative()

  @Field(() => Subjunctive, { nullable: true })
  subjunctive?: Subjunctive = new Subjunctive()

  @Field(() => Imperative, { nullable: true })
  imperative?: Imperative = new Imperative()

  @Field(() => NonFinite, { nullable: true })
  nonFinite?: NonFinite = new NonFinite()

  @Field(() => VerbalNoun, { nullable: true })
  verbalNoun?: VerbalNoun = new VerbalNoun()
}
