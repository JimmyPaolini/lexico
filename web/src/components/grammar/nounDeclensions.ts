import { Inflection } from "../../../../entity/dictionary/word/Inflection"
import { PartOfSpeech } from "../../../../entity/dictionary/word/PartOfSpeech"
import PrincipalPart from "../../../../entity/dictionary/word/PrincipalPart"

export default [
  {
    id: "first",
    partOfSpeech: "" as PartOfSpeech,
    principalParts: [
      { name: "title", text: ["Noun First Declension"] },
    ] as PrincipalPart[],
    inflection: {
      other: "-a, -ae",
    } as Inflection,
    info: "Gender: usually feminine, sometimes masculine",
    forms: {
      nominative: {
        singular: ["-a"],
        plural: ["-ae"],
      },
      genitive: {
        singular: ["-ae"],
        plural: ["-ārum"],
      },
      dative: {
        singular: ["-ae"],
        plural: ["-īs"],
      },
      accusative: {
        singular: ["-am"],
        plural: ["-ās"],
      },
      ablative: {
        singular: ["-ā"],
        plural: ["-īs"],
      },
      vocative: {
        singular: ["-a"],
        plural: ["-ae"],
      },
    },
  },
  {
    id: "second",
    partOfSpeech: "" as PartOfSpeech,
    principalParts: [
      { name: "title", text: ["Noun Second Declension"] },
    ] as PrincipalPart[],
    inflection: { other: "-us, -i" } as Inflection,
    info: "Gender: always masculine",
    forms: {
      nominative: {
        singular: ["-us"],
        plural: ["-ī"],
      },
      genitive: {
        singular: ["-ī"],
        plural: ["-ōrum"],
      },
      dative: {
        singular: ["-ō"],
        plural: ["-īs"],
      },
      accusative: {
        singular: ["-um"],
        plural: ["-ōs"],
      },
      ablative: {
        singular: ["-ō"],
        plural: ["-īs"],
      },
      vocative: {
        singular: ["-e"],
        plural: ["-ī"],
      },
    },
  },
  {
    id: "second neuter",
    partOfSpeech: "" as PartOfSpeech,
    principalParts: [
      { name: "title", text: ["Noun Second Declension Neuter"] },
    ] as PrincipalPart[],
    inflection: { other: "-um, -i" } as Inflection,
    info: "Gender: always neuter",
    forms: {
      nominative: {
        singular: ["-um"],
        plural: ["-a"],
      },
      genitive: {
        singular: ["-ī"],
        plural: ["-ōrum"],
      },
      dative: {
        singular: ["-ō"],
        plural: ["-īs"],
      },
      accusative: {
        singular: ["-um"],
        plural: ["-a"],
      },
      ablative: {
        singular: ["-ō"],
        plural: ["-īs"],
      },
      vocative: {
        singular: ["-um"],
        plural: ["a"],
      },
    },
  },
  {
    id: "third masc/fem",
    partOfSpeech: "" as PartOfSpeech,
    principalParts: [
      { name: "title", text: ["Noun Third Declension"] },
    ] as PrincipalPart[],
    inflection: { other: "-r/o/x/s, -is" } as Inflection,
    info: "Gender: masculine or feminine",
    forms: {
      nominative: {
        singular: ["-r", "-o", "-x", "-s"],
        plural: ["-ēs"],
      },
      genitive: {
        singular: ["-is"],
        plural: ["-um"],
      },
      dative: {
        singular: ["-ī"],
        plural: ["-ibus"],
      },
      accusative: {
        singular: ["-em"],
        plural: ["-ēs"],
      },
      ablative: {
        singular: ["-e"],
        plural: ["-ibus"],
      },
      vocative: {
        singular: ["-r", "-o", "-x", "-s"],
        plural: ["a"],
      },
    },
  },
  {
    id: "third neuter",
    partOfSpeech: "" as PartOfSpeech,
    principalParts: [
      { name: "title", text: ["Noun Third Declension Neuter"] },
    ] as PrincipalPart[],
    inflection: { other: "-r/o/x/s, -is" } as Inflection,
    info: "Gender: always neuter",
    forms: {
      nominative: {
        singular: ["-r", "-o", "-x", "-s"],
        plural: ["-a"],
      },
      genitive: {
        singular: ["-is"],
        plural: ["-um"],
      },
      dative: {
        singular: ["-ī"],
        plural: ["-ibus"],
      },
      accusative: {
        singular: ["-r", "-o", "-x", "-s"],
        plural: ["-a"],
      },
      ablative: {
        singular: ["-e", "-i"],
        plural: ["-ibus"],
      },
      vocative: {
        singular: ["-r", "-o", "-x", "-s"],
        plural: ["a"],
      },
    },
  },
  {
    id: "fourth",
    partOfSpeech: "" as PartOfSpeech,
    principalParts: [
      { name: "title", text: ["Noun Fourth Declension"] },
    ] as PrincipalPart[],
    inflection: {
      other: "-us, ūs",
    } as Inflection,
    info: "Gender: usually masculine, sometimes feminine/neuter",
    forms: {
      nominative: {
        singular: ["us"],
        plural: ["ūs"],
      },
      genitive: {
        singular: ["ūs"],
        plural: ["uum"],
      },
      dative: {
        singular: ["uī"],
        plural: ["ibus"],
      },
      accusative: {
        singular: ["um"],
        plural: ["ūs"],
      },
      ablative: {
        singular: ["ū"],
        plural: ["ibus"],
      },
      vocative: {
        singular: ["us"],
        plural: ["ūs"],
      },
    },
  },
  {
    id: "fifth",
    partOfSpeech: "" as PartOfSpeech,
    principalParts: [
      { name: "title", text: ["Noun Fifth Declension"] },
    ] as PrincipalPart[],
    inflection: {
      other: "-ēs, -ēi",
    } as Inflection,
    info: "Gender: usually masculine, sometimes feminine",
    forms: {
      nominative: {
        singular: ["-ēs"],
        plural: ["-ēs"],
      },
      genitive: {
        singular: ["-eī"],
        plural: ["-ērum"],
      },
      dative: {
        singular: ["-eī"],
        plural: ["-ēbus"],
      },
      accusative: {
        singular: ["-em"],
        plural: ["-ēs"],
      },
      ablative: {
        singular: ["-ē"],
        plural: ["-ēbus"],
      },
      vocative: {
        singular: ["-ēs"],
        plural: ["-ēs"],
      },
    },
  },
]
