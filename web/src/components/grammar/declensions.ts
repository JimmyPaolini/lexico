import {Inflection} from '../../../../entity/dictionary/word/Inflection';
import {PartOfSpeech} from '../../../../entity/dictionary/word/PartOfSpeech';
import PrincipalPart from '../../../../entity/dictionary/word/PrincipalPart';

export default {
  first: {
    id: "first",
    partOfSpeech: "noun" as PartOfSpeech,
    principalParts: [
      { name: "nominative", text: ["-a"] },
      { name: "genitive", text: ["-ae"] },
    ] as PrincipalPart[],
    inflection: { declension: "first", gender: "feminine" } as Inflection,
  },
  second: {
    id: "second",
    partOfSpeech: "noun" as PartOfSpeech,
    principalParts: [
      { name: "nominative", text: ["-us"] },
      { name: "genitive", text: ["-i"] },
    ] as PrincipalPart[],
    inflection: { declension: "second", gender: "masculine" } as Inflection,
  },
  "second neuter": {
    id: "second",
    partOfSpeech: "noun" as PartOfSpeech,
    principalParts: [
      { name: "nominative", text: ["-us"] },
      { name: "genitive", text: ["-i"] },
    ] as PrincipalPart[],
    inflection: { declension: "second", gender: "neuter" } as Inflection,
  },
}