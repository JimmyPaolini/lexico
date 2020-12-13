type Indicative = {
  active: {
    "present": IndicativeNumber
    "imperfect": IndicativeNumber
    "future": IndicativeNumber
    "perfect": IndicativeNumber
    "pluperfect": IndicativeNumber
    "future perfect": IndicativeNumber
  }
  passive: {
    "present": IndicativeNumber
    "imperfect": IndicativeNumber
    "future": IndicativeNumber
    "perfect": IndicativeNumber
    "pluperfect": IndicativeNumber
    "future perfect": IndicativeNumber
  }
}

type IndicativeNumber = {
  singular: IndicativePerson
  plural: IndicativePerson
}

type IndicativePerson = {
  first: string[]
  second: string[]
  third: string[]
}
