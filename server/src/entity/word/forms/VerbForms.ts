import { Field, ObjectType } from "type-graphql"
import Imperative from "./verbForms/Imperative"
import Indicative from "./verbForms/Indicative"
import NonFinite from "./verbForms/NonFinite"
import Subjunctive from "./verbForms/Subjunctive"
import VerbalNoun from "./verbForms/VerbalNoun"

@ObjectType()
export default class VerbForms {
  @Field(() => Indicative)
  indicative: Indicative = new Indicative()

  @Field(() => Subjunctive)
  subjunctive: Subjunctive = new Subjunctive()

  @Field(() => Imperative)
  imperative: Imperative = new Imperative()

  @Field(() => NonFinite)
  nonFinite: NonFinite = new NonFinite()

  @Field(() => VerbalNoun)
  verbalNoun: VerbalNoun = new VerbalNoun()
}
