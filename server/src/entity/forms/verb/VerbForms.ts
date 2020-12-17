import { Field, ObjectType } from "type-graphql"
import Imperative from "./Imperative"
import Indicative from "./Indicative"
import NonFinite from "./NonFinite"
import Subjunctive from "./Subjunctive"
import VerbalNoun from "./VerbalNoun"

@ObjectType()
export default class VerbForms {
  @Field(() => Indicative)
  indicative: Indicative

  @Field(() => Subjunctive)
  subjunctive: Subjunctive

  @Field(() => Imperative)
  imperative: Imperative

  @Field(() => NonFinite)
  nonFinite: NonFinite

  @Field(() => VerbalNoun)
  verbalNoun: VerbalNoun
}
