import { Inflection, PrincipalPart } from "../../graphql/generated"

export default [
  {
    id: "first",
    partOfSpeech: "",
    principalParts: [
      {
        name: "title",
        text: ["Verb First Conjugation"],
      },
    ] as PrincipalPart[],
    inflection: {
      other: "-ō, -āre, -āvī, -atum",
    } as Inflection,
    forms: {
      indicative: {
        active: {
          present: {
            singular: {
              first: ["-ō"],
              second: ["-ās"],
              third: ["-at"],
            },
            plural: {
              first: ["-āmus"],
              second: ["-ātis"],
              third: ["-ant"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ābam"],
              second: ["-ābās"],
              third: ["-ābat"],
            },
            plural: {
              first: ["-ābāmus"],
              second: ["-ābātis"],
              third: ["-ābant"],
            },
          },
          future: {
            singular: {
              first: ["-ābō"],
              second: ["-ābis"],
              third: ["-ābit"],
            },
            plural: {
              first: ["-ābimus"],
              second: ["-ābitis"],
              third: ["-ābunt"],
            },
          },
          perfect: {
            singular: {
              first: ["-ī"],
              second: ["-istī", "-āstī"],
              third: ["-it"],
            },
            plural: {
              first: ["-imus"],
              second: ["-istis", "-āstis"],
              third: ["-ērunt", "-ēre"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-āveram"],
              second: ["-āverās"],
              third: ["-āverat"],
            },
            plural: {
              first: ["-āverāmus"],
              second: ["-āverātis"],
              third: ["-āverant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-āverō"],
              second: ["-āveris"],
              third: ["-āverit"],
            },
            plural: {
              first: ["-āverimus"],
              second: ["-āveritis"],
              third: ["-āverint"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-or"],
              second: ["-āris", "-āre"],
              third: ["-ātur"],
            },
            plural: {
              first: ["-āmur"],
              second: ["-āminī"],
              third: ["-āntur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ābar"],
              second: ["-ābāris", "-ābāre"],
              third: ["-ābātur"],
            },
            plural: {
              first: ["-ābāmur"],
              second: ["-ābāminī"],
              third: ["-ābantur"],
            },
          },
          future: {
            singular: {
              first: ["-ābor"],
              second: ["-āberis", "-ābere"],
              third: ["-ābitur"],
            },
            plural: {
              first: ["-ābimur"],
              second: ["-ābiminī"],
              third: ["-ābuntur"],
            },
          },
          perfect: {
            singular: {
              first: ["-ātus sum"],
              second: ["-ātus es"],
              third: ["-ātus est"],
            },
            plural: {
              first: ["-ātī sumus"],
              second: ["-ātī estis"],
              third: ["-ātī sunt"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-ātus eram"],
              second: ["-ātus erās"],
              third: ["-ātus erat"],
            },
            plural: {
              first: ["-ātī erāmus"],
              second: ["-ātī erātis"],
              third: ["-ātī erant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-ātus erō"],
              second: ["-ātus eris"],
              third: ["-ātus erit"],
            },
            plural: {
              first: ["-ātī erimus"],
              second: ["-ātī eritis"],
              third: ["-ātī erunt"],
            },
          },
        },
      },
      subjunctive: {
        active: {
          present: {
            singular: {
              first: ["-em"],
              second: ["-ēs"],
              third: ["-et"],
            },
            plural: {
              first: ["-ēmus"],
              second: ["-ētis"],
              third: ["-ent"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ārem"],
              second: ["-ārēs"],
              third: ["-āret"],
            },
            plural: {
              first: ["-ārēmus"],
              second: ["-ārētis"],
              third: ["-ārent"],
            },
          },
          perfect: {
            singular: {
              first: ["-āverim"],
              second: ["-āverīs"],
              third: ["-āverit"],
            },
            plural: {
              first: ["-āverīmus"],
              second: ["-āverītis"],
              third: ["-āverint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-āvissem", "-āssem"],
              second: ["-āvissēs", "-āssēs"],
              third: ["-āvisset", "-āsset"],
            },
            plural: {
              first: ["-āvissēmus", "-āssēmus"],
              second: ["-āvissētis", "-āssētis"],
              third: ["-āvissent", "-āssent"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-er"],
              second: ["-ēris", "-ēre"],
              third: ["-ētur"],
            },
            plural: {
              first: ["-ēmur"],
              second: ["-ēminī"],
              third: ["-entur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ārer"],
              second: ["-ārēris", "-ārēre"],
              third: ["-ārētur"],
            },
            plural: {
              first: ["-ārēmur"],
              second: ["-ārēminī"],
              third: ["-ārentur"],
            },
          },
          perfect: {
            singular: {
              first: ["-ātus sim"],
              second: ["-ātus sīs"],
              third: ["-ātus sit"],
            },
            plural: {
              first: ["-ātī sīmus"],
              second: ["-ātī sītis"],
              third: ["-ātī sint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-ātus essem", "-ātus forem"],
              second: ["-ātus essēs", "-ātus forēs"],
              third: ["-ātus esset", "-ātus foret"],
            },
            plural: {
              first: ["-ātī essēmus", "-ātus forēmus"],
              second: ["-ātī essētis", "-ātus forētis"],
              third: ["-ātī essent", "-ātus forent"],
            },
          },
        },
      },
      imperative: {
        active: {
          present: {
            singular: {
              second: ["-ā"],
            },
            plural: {
              second: ["-āte"],
            },
          },
          future: {
            singular: {
              second: ["-ātō"],
              third: ["-ātō"],
            },
            plural: {
              second: ["-ātōte"],
              third: ["-antō"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              second: ["-āre"],
            },
            plural: {
              second: ["-āminī"],
            },
          },
          future: {
            singular: {
              second: ["-ātor"],
              third: ["-ātor"],
            },
            plural: {
              third: ["-antor"],
            },
          },
        },
      },
      nonFinite: {
        infinitive: {
          active: {
            present: ["-āre"],
            perfect: ["-isse", "-āsse"],
            future: ["-ātūrum esse"],
          },
          passive: {
            present: ["-ārī"],
            perfect: ["-ātum esse"],
            future: ["-ātum īrī"],
          },
        },
        participle: {
          active: {
            present: ["-āns"],
            future: ["-ātūrus"],
          },
          passive: {
            perfect: ["-ātus"],
            future: ["-andus"],
          },
        },
      },
      verbalNoun: {
        gerund: {
          genitive: ["-andī"],
          dative: ["-andō"],
          accusative: ["-andum"],
          ablative: ["-andō"],
        },
        supine: {
          accusative: ["-ātum"],
          ablative: ["-ātū"],
        },
      },
    },
  },
  {
    id: "second",
    partOfSpeech: "",
    principalParts: [
      {
        name: "title",
        text: ["Verb Second Conjugation"],
      },
    ] as PrincipalPart[],
    inflection: {
      other: "-eō, -ēre, -ī, -um",
    } as Inflection,
    forms: {
      indicative: {
        active: {
          present: {
            singular: {
              first: ["-eō"],
              second: ["-ēs"],
              third: ["-et"],
            },
            plural: {
              first: ["-ēmus"],
              second: ["-ētis"],
              third: ["-ent"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ēbam"],
              second: ["-ēbās"],
              third: ["-ēbat"],
            },
            plural: {
              first: ["-ēbāmus"],
              second: ["-ēbātis"],
              third: ["-ēbant"],
            },
          },
          future: {
            singular: {
              first: ["-ēbō"],
              second: ["-ēbis"],
              third: ["-ēbit"],
            },
            plural: {
              first: ["-ēbimus"],
              second: ["-ēbitis"],
              third: ["-ēbunt"],
            },
          },
          perfect: {
            singular: {
              first: ["-ī"],
              second: ["-istī"],
              third: ["-it"],
            },
            plural: {
              first: ["-imus"],
              second: ["-istis"],
              third: ["-ērunt", "-ēre"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-eram"],
              second: ["-erās"],
              third: ["-erat"],
            },
            plural: {
              first: ["-erāmus"],
              second: ["-erātis"],
              third: ["-erant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-erō"],
              second: ["-eris"],
              third: ["-erit"],
            },
            plural: {
              first: ["-erimus"],
              second: ["-eritis"],
              third: ["-erint"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-eor"],
              second: ["-ēris", "-ēre"],
              third: ["-ētur"],
            },
            plural: {
              first: ["-ēmur"],
              second: ["-ēminī"],
              third: ["-entur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ēbar"],
              second: ["-ēbāris", "-ēbāre"],
              third: ["-ēbātur"],
            },
            plural: {
              first: ["-ēbāmur"],
              second: ["-ēbāminī"],
              third: ["-ēbantur"],
            },
          },
          future: {
            singular: {
              first: ["-ēbor"],
              second: ["-ēberis", "-ēbere"],
              third: ["-ēbitur"],
            },
            plural: {
              first: ["-ēbimur"],
              second: ["-ēbiminī"],
              third: ["-ēbuntur"],
            },
          },
          perfect: {
            singular: {
              first: ["-us sum"],
              second: ["-us es"],
              third: ["-us est"],
            },
            plural: {
              first: ["-ī sumus"],
              second: ["-ī estis"],
              third: ["-ī sunt"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-us eram"],
              second: ["-us erās"],
              third: ["-us erat"],
            },
            plural: {
              first: ["-ī erāmus"],
              second: ["-ī erātis"],
              third: ["-ī erant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-us erō"],
              second: ["-us eris"],
              third: ["-us erit"],
            },
            plural: {
              first: ["-ī erimus"],
              second: ["-ī eritis"],
              third: ["-ī erunt"],
            },
          },
        },
      },
      subjunctive: {
        active: {
          present: {
            singular: {
              first: ["-eam"],
              second: ["-eās"],
              third: ["-eat"],
            },
            plural: {
              first: ["-eāmus"],
              second: ["-eātis"],
              third: ["-eant"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ērem"],
              second: ["-ērēs"],
              third: ["-ēret"],
            },
            plural: {
              first: ["-ērēmus"],
              second: ["-ērētis"],
              third: ["-ērent"],
            },
          },
          perfect: {
            singular: {
              first: ["-erim"],
              second: ["-erīs"],
              third: ["-erit"],
            },
            plural: {
              first: ["-erīmus"],
              second: ["-erītis"],
              third: ["-erint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-issem"],
              second: ["-issēs"],
              third: ["-isset"],
            },
            plural: {
              first: ["-issēmus"],
              second: ["-issētis"],
              third: ["-issent"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-ear"],
              second: ["-eāris", "-eāre"],
              third: ["-eātur"],
            },
            plural: {
              first: ["-eāmur"],
              second: ["-eāminī"],
              third: ["-eantur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ērer"],
              second: ["-ērēris", "-ērēre"],
              third: ["-ērētur"],
            },
            plural: {
              first: ["-ērēmur"],
              second: ["-ērēminī"],
              third: ["-ērentur"],
            },
          },
          perfect: {
            singular: {
              first: ["-us sim"],
              second: ["-us sīs"],
              third: ["-us sit"],
            },
            plural: {
              first: ["-ī sīmus"],
              second: ["-ī sītis"],
              third: ["-ī sint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-us essem", "-us forem"],
              second: ["-us essēs", "-us forēs"],
              third: ["-us esset", "-us foret"],
            },
            plural: {
              first: ["-ī essēmus", "-ī forēmus"],
              second: ["-ī essētis", "-ī forētis"],
              third: ["-ī essent", "-ī forent"],
            },
          },
        },
      },
      imperative: {
        active: {
          present: {
            singular: {
              second: ["-ē"],
            },
            plural: {
              second: ["-ēte"],
            },
          },
          future: {
            singular: {
              second: ["-ētō"],
              third: ["-ētō"],
            },
            plural: {
              second: ["-ētōte"],
              third: ["-entō"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              second: ["-ēre"],
            },
            plural: {
              second: ["-ēminī"],
            },
          },
          future: {
            singular: {
              second: ["-ētor"],
              third: ["-ētor"],
            },
            plural: {
              third: ["-entor"],
            },
          },
        },
      },
      nonFinite: {
        infinitive: {
          active: {
            present: ["-ēre"],
            perfect: ["-isse"],
            future: ["-ūrum esse"],
          },
          passive: {
            present: ["-ērī", "-ērier"],
            perfect: ["-um esse"],
            future: ["-um īrī"],
          },
        },
        participle: {
          active: {
            present: ["-ēns"],
            future: ["-ūrus"],
          },
          passive: {
            perfect: ["-us"],
            future: ["-endus"],
          },
        },
      },
      verbalNoun: {
        gerund: {
          genitive: ["-endī"],
          dative: ["-endō"],
          accusative: ["-endum"],
          ablative: ["-endō"],
        },
        supine: {
          accusative: ["-um"],
          ablative: ["-ū"],
        },
      },
    },
  },
  {
    id: "third",
    partOfSpeech: "",
    principalParts: [
      {
        name: "title",
        text: ["Verb Third Conjugation"],
      },
    ] as PrincipalPart[],
    inflection: {
      other: "-ō, -ere, -ī, -um",
    } as Inflection,
    forms: {
      indicative: {
        active: {
          present: {
            singular: {
              first: ["-ō"],
              second: ["-is"],
              third: ["-it"],
            },
            plural: {
              first: ["-imus"],
              second: ["-itis"],
              third: ["-unt"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ēbam"],
              second: ["-ēbās"],
              third: ["-ēbat"],
            },
            plural: {
              first: ["-ēbāmus"],
              second: ["-ēbātis"],
              third: ["-ēbant"],
            },
          },
          future: {
            singular: {
              first: ["-am"],
              second: ["-ēs"],
              third: ["-et"],
            },
            plural: {
              first: ["-ēmus"],
              second: ["-ētis"],
              third: ["-ent"],
            },
          },
          perfect: {
            singular: {
              first: ["-ī"],
              second: ["-istī"],
              third: ["-it"],
            },
            plural: {
              first: ["-imus"],
              second: ["-istis"],
              third: ["-ērunt", "-ēre"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-eram"],
              second: ["-erās"],
              third: ["-erat"],
            },
            plural: {
              first: ["-erāmus"],
              second: ["-erātis"],
              third: ["-erant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-erō"],
              second: ["-eris"],
              third: ["-erit"],
            },
            plural: {
              first: ["-erimus"],
              second: ["-eritis"],
              third: ["-erint"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-or"],
              second: ["-eris", "-ere"],
              third: ["-itur"],
            },
            plural: {
              first: ["-imur"],
              second: ["-iminī"],
              third: ["-untur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-ēbar"],
              second: ["-ēbāris", "-ēbāre"],
              third: ["-ēbātur"],
            },
            plural: {
              first: ["-ēbāmur"],
              second: ["-ēbāminī"],
              third: ["-ēbantur"],
            },
          },
          future: {
            singular: {
              first: ["-ar"],
              second: ["-ēris", "-ēre"],
              third: ["-ētur"],
            },
            plural: {
              first: ["-ēmur"],
              second: ["-ēminī"],
              third: ["-entur"],
            },
          },
          perfect: {
            singular: {
              first: ["-us sum"],
              second: ["-us es"],
              third: ["-us est"],
            },
            plural: {
              first: ["-ī sumus"],
              second: ["-ī estis"],
              third: ["-ī sunt"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-us eram"],
              second: ["-us erās"],
              third: ["-us erat"],
            },
            plural: {
              first: ["-ī erāmus"],
              second: ["-ī erātis"],
              third: ["-ī erant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-us erō"],
              second: ["-us eris"],
              third: ["-us erit"],
            },
            plural: {
              first: ["-ī erimus"],
              second: ["-ī eritis"],
              third: ["-ī erunt"],
            },
          },
        },
      },
      subjunctive: {
        active: {
          present: {
            singular: {
              first: ["-am"],
              second: ["-ās"],
              third: ["-at"],
            },
            plural: {
              first: ["-āmus"],
              second: ["-ātis"],
              third: ["-ant"],
            },
          },
          imperfect: {
            singular: {
              first: ["-erem"],
              second: ["-erēs"],
              third: ["-eret"],
            },
            plural: {
              first: ["-erēmus"],
              second: ["-erētis"],
              third: ["-erent"],
            },
          },
          perfect: {
            singular: {
              first: ["-erim"],
              second: ["-erīs"],
              third: ["-erit"],
            },
            plural: {
              first: ["-erīmus"],
              second: ["-erītis"],
              third: ["-erint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-issem"],
              second: ["-issēs"],
              third: ["-isset"],
            },
            plural: {
              first: ["-issēmus"],
              second: ["-issētis"],
              third: ["-issent"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-ar"],
              second: ["-āris", "-āre"],
              third: ["-ātur"],
            },
            plural: {
              first: ["-āmur"],
              second: ["-āminī"],
              third: ["-antur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-erer"],
              second: ["-erēris", "-erēre"],
              third: ["-erētur"],
            },
            plural: {
              first: ["-erēmur"],
              second: ["-erēminī"],
              third: ["-erentur"],
            },
          },
          perfect: {
            singular: {
              first: ["-us sim"],
              second: ["-us sīs"],
              third: ["-us sit"],
            },
            plural: {
              first: ["-ī sīmus"],
              second: ["-ī sītis"],
              third: ["-ī sint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-us essem", "-us forem"],
              second: ["-us essēs", "-us forēs"],
              third: ["-us esset", "-us foret"],
            },
            plural: {
              first: ["-ī essēmus", "-ī forēmus"],
              second: ["-ī essētis", "-ī forētis"],
              third: ["-ī essent", "-ī forent"],
            },
          },
        },
      },
      imperative: {
        active: {
          present: {
            singular: {
              second: ["-e"],
            },
            plural: {
              second: ["-ite"],
            },
          },
          future: {
            singular: {
              second: ["-itō"],
              third: ["-itō"],
            },
            plural: {
              second: ["-itōte"],
              third: ["-untō"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              second: ["-ere"],
            },
            plural: {
              second: ["-iminī"],
            },
          },
          future: {
            singular: {
              second: ["-itor"],
              third: ["-itor"],
            },
            plural: {
              third: ["-untor"],
            },
          },
        },
      },
      nonFinite: {
        infinitive: {
          active: {
            present: ["-ere"],
            perfect: ["-isse"],
            future: ["-ūrum esse"],
          },
          passive: {
            present: ["-ī"],
            perfect: ["-um esse"],
            future: ["-um īrī"],
          },
        },
        participle: {
          active: {
            present: ["-ēns"],
            future: ["-ūrus"],
          },
          passive: {
            perfect: ["-us"],
            future: ["-endus", "-undus"],
          },
        },
      },
      verbalNoun: {
        gerund: {
          genitive: ["-endī"],
          dative: ["-endō"],
          accusative: ["-endum"],
          ablative: ["-endō"],
        },
        supine: {
          accusative: ["-um"],
          ablative: ["-ū"],
        },
      },
    },
  },
  {
    id: "third i-stem",
    partOfSpeech: "",
    principalParts: [
      {
        name: "title",
        text: ["Verb Third i-stem Conjugation"],
      },
    ] as PrincipalPart[],
    inflection: {
      other: "-iō, -ere, -ī, -um",
    } as Inflection,
    forms: {
      indicative: {
        active: {
          present: {
            singular: {
              first: ["-iō"],
              second: ["-is"],
              third: ["-it"],
            },
            plural: {
              first: ["-imus"],
              second: ["-itis"],
              third: ["-iunt"],
            },
          },
          imperfect: {
            singular: {
              first: ["-iēbam"],
              second: ["-iēbās"],
              third: ["-iēbat"],
            },
            plural: {
              first: ["-iēbāmus"],
              second: ["-iēbātis"],
              third: ["-iēbant"],
            },
          },
          future: {
            singular: {
              first: ["-iam"],
              second: ["-iēs"],
              third: ["-iet"],
            },
            plural: {
              first: ["-iēmus"],
              second: ["-iētis"],
              third: ["-ient"],
            },
          },
          perfect: {
            singular: {
              first: ["-ī"],
              second: ["-istī"],
              third: ["-it"],
            },
            plural: {
              first: ["-imus"],
              second: ["-istis"],
              third: ["-ērunt", "-ēre"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-eram"],
              second: ["-erās"],
              third: ["-erat"],
            },
            plural: {
              first: ["-erāmus"],
              second: ["-erātis"],
              third: ["-erant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-erō"],
              second: ["-eris"],
              third: ["-erit"],
            },
            plural: {
              first: ["-erimus"],
              second: ["-eritis"],
              third: ["-erint"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-ior"],
              second: ["-eris", "-ere"],
              third: ["-itur"],
            },
            plural: {
              first: ["-imur"],
              second: ["-iminī"],
              third: ["-iuntur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-iēbar"],
              second: ["-iēbāris", "-iēbāre"],
              third: ["-iēbātur"],
            },
            plural: {
              first: ["-iēbāmur"],
              second: ["-iēbāminī"],
              third: ["-iēbantur"],
            },
          },
          future: {
            singular: {
              first: ["-iar"],
              second: ["-iēris", "-iēre"],
              third: ["-iētur"],
            },
            plural: {
              first: ["-iēmur"],
              second: ["-iēminī"],
              third: ["-ientur"],
            },
          },
          perfect: {
            singular: {
              first: ["-us sum"],
              second: ["-us es"],
              third: ["-us est"],
            },
            plural: {
              first: ["-ī sumus"],
              second: ["-ī estis"],
              third: ["-ī sunt"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-us eram"],
              second: ["-us erās"],
              third: ["-us erat"],
            },
            plural: {
              first: ["-ī erāmus"],
              second: ["-ī erātis"],
              third: ["-ī erant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-us erō"],
              second: ["-us eris"],
              third: ["-us erit"],
            },
            plural: {
              first: ["-ī erimus"],
              second: ["-ī eritis"],
              third: ["-ī erunt"],
            },
          },
        },
      },
      subjunctive: {
        active: {
          present: {
            singular: {
              first: ["-iam"],
              second: ["-iās"],
              third: ["-iat"],
            },
            plural: {
              first: ["-iāmus"],
              second: ["-iātis"],
              third: ["-iant"],
            },
          },
          imperfect: {
            singular: {
              first: ["-erem"],
              second: ["-erēs"],
              third: ["-eret"],
            },
            plural: {
              first: ["-erēmus"],
              second: ["-erētis"],
              third: ["-erent"],
            },
          },
          perfect: {
            singular: {
              first: ["-erim"],
              second: ["-erīs"],
              third: ["-erit"],
            },
            plural: {
              first: ["-erīmus"],
              second: ["-erītis"],
              third: ["-erint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-issem"],
              second: ["-issēs"],
              third: ["-isset"],
            },
            plural: {
              first: ["-issēmus"],
              second: ["-issētis"],
              third: ["-issent"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-iar"],
              second: ["-iāris", "-iāre"],
              third: ["-iātur"],
            },
            plural: {
              first: ["-iāmur"],
              second: ["-iāminī"],
              third: ["-iantur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-erer"],
              second: ["-erēris", "-erēre"],
              third: ["-erētur"],
            },
            plural: {
              first: ["-erēmur"],
              second: ["-erēminī"],
              third: ["-erentur"],
            },
          },
          perfect: {
            singular: {
              first: ["-us sim"],
              second: ["-us sīs"],
              third: ["-us sit"],
            },
            plural: {
              first: ["-ī sīmus"],
              second: ["-ī sītis"],
              third: ["-ī sint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-us essem", "-us forem"],
              second: ["-us essēs", "-us forēs"],
              third: ["-us esset", "-us foret"],
            },
            plural: {
              first: ["-ī essēmus", "-ī forēmus"],
              second: ["-ī essētis", "-ī forētis"],
              third: ["-ī essent", "-ī forent"],
            },
          },
        },
      },
      imperative: {
        active: {
          present: {
            singular: {
              second: ["-e"],
            },
            plural: {
              second: ["-ite"],
            },
          },
          future: {
            singular: {
              second: ["-itō"],
              third: ["-itō"],
            },
            plural: {
              second: ["-itōte"],
              third: ["-iuntō"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              second: ["-ere"],
            },
            plural: {
              second: ["-iminī"],
            },
          },
          future: {
            singular: {
              second: ["-itor"],
              third: ["-itor"],
            },
            plural: {
              third: ["-iuntor"],
            },
          },
        },
      },
      nonFinite: {
        infinitive: {
          active: {
            present: ["-ere"],
            perfect: ["-isse"],
            future: ["-ūrum esse"],
          },
          passive: {
            present: ["-ī"],
            perfect: ["-um esse"],
            future: ["-um īrī"],
          },
        },
        participle: {
          active: {
            present: ["-iēns"],
            future: ["-ūrus"],
          },
          passive: {
            perfect: ["-us"],
            future: ["-iendus", "-iundus"],
          },
        },
      },
      verbalNoun: {
        gerund: {
          genitive: ["-iendī"],
          dative: ["-iendō"],
          accusative: ["-iendum"],
          ablative: ["-iendō"],
        },
        supine: {
          accusative: ["-um"],
          ablative: ["-ū"],
        },
      },
    },
  },
  {
    id: "fourth",
    partOfSpeech: "",
    principalParts: [
      {
        name: "title",
        text: ["Verb Fourth Conjugation"],
      },
    ] as PrincipalPart[],
    inflection: {
      other: "-iō, -īre, -ī, -um",
    } as Inflection,
    forms: {
      indicative: {
        active: {
          present: {
            singular: {
              first: ["-iō"],
              second: ["-īs"],
              third: ["-it"],
            },
            plural: {
              first: ["-īmus"],
              second: ["-ītis"],
              third: ["-iunt"],
            },
          },
          imperfect: {
            singular: {
              first: ["-iēbam"],
              second: ["-iēbās"],
              third: ["-iēbat"],
            },
            plural: {
              first: ["-iēbāmus"],
              second: ["-iēbātis"],
              third: ["-iēbant"],
            },
          },
          future: {
            singular: {
              first: ["-iam"],
              second: ["-iēs"],
              third: ["-iet"],
            },
            plural: {
              first: ["-iēmus"],
              second: ["-iētis"],
              third: ["-ient"],
            },
          },
          perfect: {
            singular: {
              first: ["-ī"],
              second: ["-istī"],
              third: ["-it"],
            },
            plural: {
              first: ["-imus"],
              second: ["-istis"],
              third: ["-iērunt", "-ēre"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-eram"],
              second: ["-erās"],
              third: ["-erat"],
            },
            plural: {
              first: ["-erāmus"],
              second: ["-erātis"],
              third: ["-erant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-erō"],
              second: ["-eris"],
              third: ["-erit"],
            },
            plural: {
              first: ["-erimus"],
              second: ["-eritis"],
              third: ["-erint"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-ior"],
              second: ["-īris", "-īre"],
              third: ["-ītur"],
            },
            plural: {
              first: ["-īmur"],
              second: ["-īminī"],
              third: ["-iuntur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-iēbar"],
              second: ["-iēbāris", "-iēbāre"],
              third: ["-iēbātur"],
            },
            plural: {
              first: ["-iēbāmur"],
              second: ["-iēbāminī"],
              third: ["-iēbantur"],
            },
          },
          future: {
            singular: {
              first: ["-iar"],
              second: ["-iēris", "-iēre"],
              third: ["-iētur"],
            },
            plural: {
              first: ["-iēmur"],
              second: ["-iēminī"],
              third: ["-ientur"],
            },
          },
          perfect: {
            singular: {
              first: ["-us sum"],
              second: ["-us es"],
              third: ["-us est"],
            },
            plural: {
              first: ["-ī sumus"],
              second: ["-ī estis"],
              third: ["-ī sunt"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-us eram"],
              second: ["-us erās"],
              third: ["-us erat"],
            },
            plural: {
              first: ["-ī erāmus"],
              second: ["-ī erātis"],
              third: ["-ī erant"],
            },
          },
          futurePerfect: {
            singular: {
              first: ["-us erō"],
              second: ["-us eris"],
              third: ["-us erit"],
            },
            plural: {
              first: ["-ī erimus"],
              second: ["-ī eritis"],
              third: ["-ī erunt"],
            },
          },
        },
      },
      subjunctive: {
        active: {
          present: {
            singular: {
              first: ["-iam"],
              second: ["-iās"],
              third: ["-iat"],
            },
            plural: {
              first: ["-iāmus"],
              second: ["-iātis"],
              third: ["-iant"],
            },
          },
          imperfect: {
            singular: {
              first: ["-īrem"],
              second: ["-īrēs"],
              third: ["-īret"],
            },
            plural: {
              first: ["-īrēmus"],
              second: ["-īrētis"],
              third: ["-īrent"],
            },
          },
          perfect: {
            singular: {
              first: ["-erim"],
              second: ["-erīs"],
              third: ["-erit"],
            },
            plural: {
              first: ["-erīmus"],
              second: ["-erītis"],
              third: ["-erint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-issem"],
              second: ["-issēs"],
              third: ["-isset"],
            },
            plural: {
              first: ["-issēmus"],
              second: ["-issētis"],
              third: ["-issent"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              first: ["-iar"],
              second: ["-iāris", "-iāre"],
              third: ["-iātur"],
            },
            plural: {
              first: ["-iāmur"],
              second: ["-iāminī"],
              third: ["-iantur"],
            },
          },
          imperfect: {
            singular: {
              first: ["-īrer"],
              second: ["-īrēris", "-īrēre"],
              third: ["-īrētur"],
            },
            plural: {
              first: ["-īrēmur"],
              second: ["-īrēminī"],
              third: ["-īrentur"],
            },
          },
          perfect: {
            singular: {
              first: ["-us sim"],
              second: ["-us sīs"],
              third: ["-us sit"],
            },
            plural: {
              first: ["-ī sīmus"],
              second: ["-ī sītis"],
              third: ["-ī sint"],
            },
          },
          pluperfect: {
            singular: {
              first: ["-us essem", "-us forem"],
              second: ["-us essēs", "-us forēs"],
              third: ["-us esset", "-us foret"],
            },
            plural: {
              first: ["-ī essēmus", "-ī forēmus"],
              second: ["-ī essētis", "-ī forētis"],
              third: ["-ī essent", "-ī forent"],
            },
          },
        },
      },
      imperative: {
        active: {
          present: {
            singular: {
              second: ["-ī"],
            },
            plural: {
              second: ["-īte"],
            },
          },
          future: {
            singular: {
              second: ["-ītō"],
              third: ["-ītō"],
            },
            plural: {
              second: ["-ītōte"],
              third: ["-iuntō"],
            },
          },
        },
        passive: {
          present: {
            singular: {
              second: ["-īre"],
            },
            plural: {
              second: ["-īminī"],
            },
          },
          future: {
            singular: {
              second: ["-ītor"],
              third: ["-ītor"],
            },
            plural: {
              third: ["-iuntor"],
            },
          },
        },
      },
      nonFinite: {
        infinitive: {
          active: {
            present: ["-īre"],
            perfect: ["-isse"],
            future: ["-ūrum esse"],
          },
          passive: {
            present: ["-īrī", "-īrier"],
            perfect: ["-um esse"],
            future: ["-um īrī"],
          },
        },
        participle: {
          active: {
            present: ["-iēns"],
            future: ["-ūrus"],
          },
          passive: {
            perfect: ["-us"],
            future: ["-iendus", "-iundus"],
          },
        },
      },
      verbalNoun: {
        gerund: {
          genitive: ["-iendī"],
          dative: ["-iendō"],
          accusative: ["-iendum"],
          ablative: ["-iendō"],
        },
        supine: {
          accusative: ["-um"],
          ablative: ["-ū"],
        },
      },
    },
  },
]
