type AdjectiveForms = {
  nominative: AdjectiveSgPl
  genitive: AdjectiveSgPl
  dative: AdjectiveSgPl
  accusative: AdjectiveSgPl
  ablative: AdjectiveSgPl
  vocative: AdjectiveSgPl
  locative: AdjectiveSgPl
}

type AdjectiveSgPl = {
  singular: MascFemNeu
  plural: MascFemNeu
}

type MascFemNeu = {
  masculine: string[]
  feminine: string[]
  neuter: string[]
}
