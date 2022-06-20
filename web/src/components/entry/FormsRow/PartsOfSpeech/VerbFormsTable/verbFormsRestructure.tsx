import { verbFormsTableTemplate } from "./verbFormsTableTemplate"

export const verbFormsRestructure = (conjugations: any) => {
  const structure = { ...verbFormsTableTemplate }
  function toFormsTable(conj: any, struc: any) {
    struc[0].centerText = conj?.singular?.first?.join?.(",\n")
    struc[2].centerText = conj?.singular?.second?.join?.(",\n")
    struc[4].centerText = conj?.singular?.third?.join?.(",\n")
    struc[1].centerText = conj?.plural?.first?.join?.(",\n")
    struc[3].centerText = conj?.plural?.second?.join?.(",\n")
    struc[5].centerText = conj?.plural?.third?.join?.(",\n")
  }

  toFormsTable(
    conjugations?.indicative?.active?.present,
    structure.IND.PRES.ACT,
  )
  toFormsTable(
    conjugations?.indicative?.passive?.present,
    structure.IND.PRES.PAS,
  )
  toFormsTable(
    conjugations?.indicative?.active?.imperfect,
    structure.IND.IMP.ACT,
  )
  toFormsTable(
    conjugations?.indicative?.passive?.imperfect,
    structure.IND.IMP.PAS,
  )
  toFormsTable(conjugations?.indicative?.active?.future, structure.IND.FUT.ACT)
  toFormsTable(conjugations?.indicative?.passive?.future, structure.IND.FUT.PAS)
  toFormsTable(
    conjugations?.indicative?.active?.perfect,
    structure.IND.PERF.ACT,
  )
  toFormsTable(
    conjugations?.indicative?.passive?.perfect,
    structure.IND.PERF.PAS,
  )
  toFormsTable(
    conjugations?.indicative?.active?.pluperfect,
    structure.IND.PLUP.ACT,
  )
  toFormsTable(
    conjugations?.indicative?.passive?.pluperfect,
    structure.IND.PLUP.PAS,
  )
  toFormsTable(
    conjugations?.indicative?.active?.futurePerfect,
    structure.IND.FUTP.ACT,
  )
  toFormsTable(
    conjugations?.indicative?.passive?.futurePerfect,
    structure.IND.FUTP.PAS,
  )

  toFormsTable(
    conjugations?.subjunctive?.active?.present,
    structure.SUB.PRES.ACT,
  )
  toFormsTable(
    conjugations?.subjunctive?.passive?.present,
    structure.SUB.PRES.PAS,
  )
  toFormsTable(
    conjugations?.subjunctive?.active?.imperfect,
    structure.SUB.IMP.ACT,
  )
  toFormsTable(
    conjugations?.subjunctive?.passive?.imperfect,
    structure.SUB.IMP.PAS,
  )
  toFormsTable(
    conjugations?.subjunctive?.active?.perfect,
    structure.SUB.PERF.ACT,
  )
  toFormsTable(
    conjugations?.subjunctive?.passive?.perfect,
    structure.SUB.PERF.PAS,
  )
  toFormsTable(
    conjugations?.subjunctive?.active?.pluperfect,
    structure.SUB.PLUP.ACT,
  )
  toFormsTable(
    conjugations?.subjunctive?.passive?.pluperfect,
    structure.SUB.PLUP.PAS,
  )

  structure.IMP["IMPERATIVE"].ACT[0].centerText =
    conjugations?.imperative?.active?.present?.singular?.second?.join?.(",\n")
  structure.IMP["IMPERATIVE"].ACT[2].centerText =
    conjugations?.imperative?.active?.future?.singular?.second?.join?.(",\n")
  structure.IMP["IMPERATIVE"].ACT[4].centerText =
    conjugations?.imperative?.active?.future?.singular?.third?.join?.(",\n")
  structure.IMP["IMPERATIVE"].ACT[1].centerText =
    conjugations?.imperative?.active?.present?.plural?.second?.join?.(",\n")
  structure.IMP["IMPERATIVE"].ACT[3].centerText =
    conjugations?.imperative?.active?.future?.plural?.second?.join?.(",\n")
  structure.IMP["IMPERATIVE"].ACT[5].centerText =
    conjugations?.imperative?.active?.future?.plural?.third?.join?.(",\n")
  structure.IMP["IMPERATIVE"].PAS[0].centerText =
    conjugations?.imperative?.passive?.present?.singular?.second?.join?.(",\n")
  structure.IMP["IMPERATIVE"].PAS[2].centerText =
    conjugations?.imperative?.passive?.future?.singular?.second?.join?.(",\n")
  structure.IMP["IMPERATIVE"].PAS[4].centerText =
    conjugations?.imperative?.passive?.future?.singular?.third?.join?.(",\n")
  structure.IMP["IMPERATIVE"].PAS[1].centerText =
    conjugations?.imperative?.passive?.present?.plural?.second?.join?.(",\n")
  // structure.IMP["IMPERATIVE"].PAS[3].centerText = conjugations?.imperative?.passive?.future?.plural?.second?.join?.(",\n");
  structure.IMP["IMPERATIVE"].PAS[5].centerText =
    conjugations?.imperative?.passive?.future?.plural?.third?.join?.(",\n")

  structure.INF["INFINITIVE"]["-"][0].centerText =
    conjugations?.nonFinite?.infinitive?.active?.present?.join?.(",\n")
  structure.INF["INFINITIVE"]["-"][1].centerText =
    conjugations?.nonFinite?.infinitive?.passive?.present?.join?.(",\n")
  structure.INF["INFINITIVE"]["-"][2].centerText =
    conjugations?.nonFinite?.infinitive?.active?.perfect?.join?.(",\n")
  structure.INF["INFINITIVE"]["-"][3].centerText =
    conjugations?.nonFinite?.infinitive?.passive?.perfect?.join?.(",\n")
  structure.INF["INFINITIVE"]["-"][4].centerText =
    conjugations?.nonFinite?.infinitive?.active?.future?.join?.(",\n")
  structure.INF["INFINITIVE"]["-"][5].centerText =
    conjugations?.nonFinite?.infinitive?.passive?.future?.join?.(",\n")

  structure.NONF["NON FINITE"].PARTICIPLE[0].centerText =
    conjugations?.nonFinite?.participle?.active?.present?.join?.(",\n")
  structure.NONF["NON FINITE"].PARTICIPLE[1].centerText =
    conjugations?.nonFinite?.participle?.passive?.perfect?.join?.(",\n")
  structure.NONF["NON FINITE"].PARTICIPLE[2].centerText =
    conjugations?.nonFinite?.participle?.active?.future?.join?.(",\n")
  structure.NONF["NON FINITE"].PARTICIPLE[3].centerText =
    conjugations?.nonFinite?.participle?.passive?.future?.join?.(",\n")
  structure.NONF["NON FINITE"]["GERUND/SUPINE"][0].centerText =
    conjugations?.verbalNoun?.gerund?.genitive?.join?.(",\n")
  structure.NONF["NON FINITE"]["GERUND/SUPINE"][1].centerText =
    conjugations?.verbalNoun?.gerund?.dative?.join?.(",\n")
  structure.NONF["NON FINITE"]["GERUND/SUPINE"][2].centerText =
    conjugations?.verbalNoun?.gerund?.accusative?.join?.(",\n")
  structure.NONF["NON FINITE"]["GERUND/SUPINE"][3].centerText =
    conjugations?.verbalNoun?.gerund?.ablative?.join?.(",\n")
  structure.NONF["NON FINITE"]["GERUND/SUPINE"][4].centerText =
    conjugations?.verbalNoun?.supine?.accusative?.join?.(",\n")
  structure.NONF["NON FINITE"]["GERUND/SUPINE"][5].centerText =
    conjugations?.verbalNoun?.supine?.ablative?.join?.(",\n")

  return structure
}
