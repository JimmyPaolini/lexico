import { EntityManager, Like } from "typeorm"
import PrincipalPart from "./entity/PrincipalPart"
import Translation from "./entity/Translation"
import Word from "./entity/Word"

const json = {
  partOfSpeech: "verb",
  translations: [
    "I love",
    "I am fond of, like",
    "I am under obligation to; I am obliged to",
    "To enjoy, be accustomed",
  ],
  etymology:
    "(with infinitive)\nProbably from Proto-Indo-European *am-a-, *am- (“mother, aunt”), a lost nursery-word of the papa-type. Compare amita (“aunt”), Old High German amma (“nurse”). Alternatively, O. Hackstein suggests Proto-Indo-European *h₂emh₃- (“seize”).",
  principalParts: [
    "present active: amō",
    "present infinitive: amāre",
    "perfect active: amāvī",
    "supine: amātum",
  ],
  inflection: "first",
  forms: {
    "indicative": {
      active: {
        "present": {
          singular: {
            first: ["amō"],
            second: ["amās"],
            third: ["amat"],
          },
          plural: {
            first: ["amāmus"],
            second: ["amātis"],
            third: ["amant"],
          },
        },
        "imperfect": {
          singular: {
            first: ["amābam"],
            second: ["amābās"],
            third: ["amābat"],
          },
          plural: {
            first: ["amābāmus"],
            second: ["amābātis"],
            third: ["amābant"],
          },
        },
        "future": {
          singular: {
            first: ["amābō"],
            second: ["amābis"],
            third: ["amābit"],
          },
          plural: {
            first: ["amābimus"],
            second: ["amābitis"],
            third: ["amābunt"],
          },
        },
        "perfect": {
          singular: {
            first: ["amāvī"],
            second: ["amāvistī", "amāstī"],
            third: ["amāvit"],
          },
          plural: {
            first: ["amāvimus"],
            second: ["amāvistis", "amāstis"],
            third: ["amāvērunt", "amāvēre"],
          },
        },
        "pluperfect": {
          singular: {
            first: ["amāveram"],
            second: ["amāverās"],
            third: ["amāverat"],
          },
          plural: {
            first: ["amāverāmus"],
            second: ["amāverātis"],
            third: ["amāverant"],
          },
        },
        "future perfect": {
          singular: {
            first: ["amāverō"],
            second: ["amāveris"],
            third: ["amāverit"],
          },
          plural: {
            first: ["amāverimus"],
            second: ["amāveritis"],
            third: ["amāverint"],
          },
        },
      },
      passive: {
        "present": {
          singular: {
            first: ["amor"],
            second: ["amāris", "amāre"],
            third: ["amātur"],
          },
          plural: {
            first: ["amāmur"],
            second: ["amāminī"],
            third: ["amantur"],
          },
        },
        "imperfect": {
          singular: {
            first: ["amābar"],
            second: ["amābāris", "amābāre"],
            third: ["amābātur"],
          },
          plural: {
            first: ["amābāmur"],
            second: ["amābāminī"],
            third: ["amābantur"],
          },
        },
        "future": {
          singular: {
            first: ["amābor"],
            second: ["amāberis", "amābere"],
            third: ["amābitur"],
          },
          plural: {
            first: ["amābimur"],
            second: ["amābiminī"],
            third: ["amābuntur"],
          },
        },
        "perfect": {
          singular: {
            first: ["amātus sum"],
            second: ["amātus es"],
            third: ["amātus est"],
          },
          plural: {
            first: ["amātus sumus"],
            second: ["amātus estis"],
            third: ["amātus sunt"],
          },
        },
        "pluperfect": {
          singular: {
            first: ["amātus eram"],
            second: ["amātus erās"],
            third: ["amātus erat"],
          },
          plural: {
            first: ["amātus erāmus"],
            second: ["amātus erātis"],
            third: ["amātus erant"],
          },
        },
        "future perfect": {
          singular: {
            first: ["amātus erō"],
            second: ["amātus eris"],
            third: ["amātus erit"],
          },
          plural: {
            first: ["amātus erimus"],
            second: ["amātus eritis"],
            third: ["amātus erunt"],
          },
        },
      },
    },
    "subjunctive": {
      active: {
        present: {
          singular: {
            first: ["amem"],
            second: ["amēs"],
            third: ["amet"],
          },
          plural: {
            first: ["amēmus"],
            second: ["amētis"],
            third: ["ament"],
          },
        },
        imperfect: {
          singular: {
            first: ["amārem"],
            second: ["amārēs"],
            third: ["amāret"],
          },
          plural: {
            first: ["amārēmus"],
            second: ["amārētis"],
            third: ["amārent"],
          },
        },
        perfect: {
          singular: {
            first: ["amāverim"],
            second: ["amāverīs"],
            third: ["amāverit"],
          },
          plural: {
            first: ["amāverīmus"],
            second: ["amāverītis"],
            third: ["amāverint"],
          },
        },
        pluperfect: {
          singular: {
            first: ["amāvissem", "amāssem"],
            second: ["amāvissēs", "amāssēs"],
            third: ["amāvisset", "amāsset"],
          },
          plural: {
            first: ["amāvissēmus", "amāssēmus"],
            second: ["amāvissētis", "amāssētis"],
            third: ["amāvissent", "amāssent"],
          },
        },
      },
      passive: {
        present: {
          singular: {
            first: ["amer"],
            second: ["amēris", "amēre"],
            third: ["amētur"],
          },
          plural: {
            first: ["amēmur"],
            second: ["amēminī"],
            third: ["amentur"],
          },
        },
        imperfect: {
          singular: {
            first: ["amārer"],
            second: ["amārēris", "amārēre"],
            third: ["amārētur"],
          },
          plural: {
            first: ["amārēmur"],
            second: ["amārēminī"],
            third: ["amārentur"],
          },
        },
        perfect: {
          singular: {
            first: ["amātus sim"],
            second: ["amātus sīs"],
            third: ["amātus sit"],
          },
          plural: {
            first: ["amātus sīmus"],
            second: ["amātus sītis"],
            third: ["amātus sint"],
          },
        },
        pluperfect: {
          singular: {
            first: ["amātus essem", "amātus forem"],
            second: ["amātus essēs", "amātus forēs"],
            third: ["amātus esset", "amātus foret"],
          },
          plural: {
            first: ["amātus essēmus", "amātus forēmus"],
            second: ["amātus essētis", "amātus forētis"],
            third: ["amātus essent", "amātus forent"],
          },
        },
      },
    },
    "imperative": {
      active: {
        present: {
          singular: {
            second: ["amā"],
          },
          plural: {
            second: ["amāte"],
          },
        },
        future: {
          singular: {
            second: ["amātō"],
            third: ["amātō"],
          },
          plural: {
            second: ["amātōte"],
            third: ["amantō"],
          },
        },
      },
      passive: {
        present: {
          singular: {
            second: ["amāre"],
          },
          plural: {
            second: ["amāminī"],
          },
        },
        future: {
          singular: {
            second: ["amātor"],
            third: ["amātor"],
          },
          plural: {
            third: ["amantor"],
          },
        },
      },
    },
    "non-finite": {
      infinitive: {
        active: {
          present: ["amāre"],
          perfect: ["amāvisse", "amāsse"],
          future: ["amātūrum esse"],
        },
        passive: {
          present: ["amārī"],
          perfect: ["amātum esse"],
          future: ["amātum īrī"],
        },
      },
      participle: {
        active: {
          present: ["amāns"],
          future: ["amātūrus"],
        },
        passive: {
          perfect: ["amātus"],
          future: ["amandus"],
        },
      },
    },
    "verbal-noun": {
      gerund: {
        genitive: ["amandī"],
        dative: ["amandō"],
        accusative: ["amandum"],
        ablative: ["amandō"],
      },
      supine: {
        accusative: ["amātum"],
        ablative: ["amātū"],
      },
    },
  },
  pronunciation: {
    classical: {
      phonemes: "A M OO",
      phonemic: "/ˈa.moː/",
      phonetic: "",
    },
    ecclesiastical: {
      phonemes: "a: m o:",
      phonemic: "/ˈa.mo/",
      phonetic: "[ˈaː.mɔ]",
    },
    vulgar: {
      phonemes: "",
      phonemic: "",
      phonetic: "",
    },
  },
  root: true,
}

export async function create(em: EntityManager) {
  const wordRepository = em.getRepository(Word)

  const word = new Word()
  word.word = "amo"
  word.partOfSpeech = json.partOfSpeech as PartOfSpeech
  word.inflection = json.inflection as Inflection
  word.principalParts = json.principalParts.map((pp) => {
    const [name, text] = pp.split(": ")
    return { name, text }
  }) as PrincipalPart[]
  word.translations = json.translations.map((t) => new Translation(t, word))
  word.roots = [word]

  await wordRepository.save(word)

  const amat = new Word()
  amat.word = "amat"
  amat.roots = [word]

  await wordRepository.save(amat)
}

export async function script(em: EntityManager) {
  // const wordRepository = em.getRepository(Word)
  // const words = await wordRepository.find({ relations: ["roots"] })
  // words.forEach(word => console.log("word", word.word, "root", word.roots))
  // console.log("Words:", words)

  // const search = await wordRepository.findOne(
  //   { word: "amat" },
  //   { relations: ["roots"] },
  // )
  // console.log("Search:", search)

  const loveWords = await em.find(Translation, {
    where: { text: Like("%love%") },
    relations: ["word"],
  })
  console.log("Love Words", loveWords)
}
