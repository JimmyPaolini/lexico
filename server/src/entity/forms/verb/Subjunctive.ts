type Subjunctive = {
  active: {
    present: SubjunctiveNumber
    imperfect: SubjunctiveNumber
    perfect: SubjunctiveNumber
    pluperfect: SubjunctiveNumber
  }
  passive: {
    present: SubjunctiveNumber
    imperfect: SubjunctiveNumber
    perfect: SubjunctiveNumber
    pluperfect: SubjunctiveNumber
  }
}

type SubjunctiveNumber = {
  singular: SubjunctivePerson
  plural: SubjunctivePerson
}

type SubjunctivePerson = {
  first: string[]
  second: string[]
  third: string[]
}
