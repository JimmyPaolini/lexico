import { VerbForms } from 'src/graphql/generated'

import { verbFormsTableTemplate } from './verbFormsTableTemplate'

export const verbFormsRestructure = (conjugations: VerbForms) => {
  const structure = { ...verbFormsTableTemplate }
  function toFormsTable(conj: any, struc: any) {
    struc[0].centerText = conj?.singular?.first?.join?.(',\n')
    struc[2].centerText = conj?.singular?.second?.join?.(',\n')
    struc[4].centerText = conj?.singular?.third?.join?.(',\n')
    struc[1].centerText = conj?.plural?.first?.join?.(',\n')
    struc[3].centerText = conj?.plural?.second?.join?.(',\n')
    struc[5].centerText = conj?.plural?.third?.join?.(',\n')
  }

  toFormsTable(
    conjugations?.indicative?.active?.present,
    structure.indicative.present.active
  )
  toFormsTable(
    conjugations?.indicative?.passive?.present,
    structure.indicative.present.passive
  )
  toFormsTable(
    conjugations?.indicative?.active?.imperfect,
    structure.indicative.imperfect.active
  )
  toFormsTable(
    conjugations?.indicative?.passive?.imperfect,
    structure.indicative.imperfect.passive
  )
  toFormsTable(
    conjugations?.indicative?.active?.future,
    structure.indicative.future.active
  )
  toFormsTable(
    conjugations?.indicative?.passive?.future,
    structure.indicative.future.passive
  )
  toFormsTable(
    conjugations?.indicative?.active?.perfect,
    structure.indicative.perfect.active
  )
  toFormsTable(
    conjugations?.indicative?.passive?.perfect,
    structure.indicative.perfect.passive
  )
  toFormsTable(
    conjugations?.indicative?.active?.pluperfect,
    structure.indicative.pluperfect.active
  )
  toFormsTable(
    conjugations?.indicative?.passive?.pluperfect,
    structure.indicative.pluperfect.passive
  )
  toFormsTable(
    conjugations?.indicative?.active?.futurePerfect,
    structure.indicative['future perfect'].active
  )
  toFormsTable(
    conjugations?.indicative?.passive?.futurePerfect,
    structure.indicative['future perfect'].passive
  )

  toFormsTable(
    conjugations?.subjunctive?.active?.present,
    structure.subjunctive.present.active
  )
  toFormsTable(
    conjugations?.subjunctive?.passive?.present,
    structure.subjunctive.present.passive
  )
  toFormsTable(
    conjugations?.subjunctive?.active?.imperfect,
    structure.subjunctive.imperfect.active
  )
  toFormsTable(
    conjugations?.subjunctive?.passive?.imperfect,
    structure.subjunctive.imperfect.passive
  )
  toFormsTable(
    conjugations?.subjunctive?.active?.perfect,
    structure.subjunctive.perfect.active
  )
  toFormsTable(
    conjugations?.subjunctive?.passive?.perfect,
    structure.subjunctive.perfect.passive
  )
  toFormsTable(
    conjugations?.subjunctive?.active?.pluperfect,
    structure.subjunctive.pluperfect.active
  )
  toFormsTable(
    conjugations?.subjunctive?.passive?.pluperfect,
    structure.subjunctive.pluperfect.passive
  )

  structure.imperative.imperative.active[0].centerText =
    conjugations?.imperative?.active?.present?.singular?.second?.join?.(
      ',\n'
    ) ?? '-'
  structure.imperative.imperative.active[2].centerText =
    conjugations?.imperative?.active?.future?.singular?.second?.join?.(',\n') ??
    '-'
  structure.imperative.imperative.active[4].centerText =
    conjugations?.imperative?.active?.future?.singular?.third?.join?.(',\n') ??
    '-'
  structure.imperative.imperative.active[1].centerText =
    conjugations?.imperative?.active?.present?.plural?.second?.join?.(',\n') ??
    '-'
  structure.imperative.imperative.active[3].centerText =
    conjugations?.imperative?.active?.future?.plural?.second?.join?.(',\n') ??
    '-'
  structure.imperative.imperative.active[5].centerText =
    conjugations?.imperative?.active?.future?.plural?.third?.join?.(',\n') ??
    '-'
  structure.imperative.imperative.passive[0].centerText =
    conjugations?.imperative?.passive?.present?.singular?.second?.join?.(
      ',\n'
    ) ?? '-'
  structure.imperative.imperative.passive[2].centerText =
    conjugations?.imperative?.passive?.future?.singular?.second?.join?.(
      ',\n'
    ) ?? '-'
  structure.imperative.imperative.passive[4].centerText =
    conjugations?.imperative?.passive?.future?.singular?.third?.join?.(',\n') ??
    '-'
  structure.imperative.imperative.passive[1].centerText =
    conjugations?.imperative?.passive?.present?.plural?.second?.join?.(',\n') ??
    '-'
  // structure.imperative["IMPERATIVE"].passive[3].centerText = conjugations?.imperative?.passive?.future?.plural?.second?.join?.(",\n");
  structure.imperative.imperative.passive[5].centerText =
    conjugations?.imperative?.passive?.future?.plural?.third?.join?.(',\n') ??
    '-'

  structure.infinitive.infinitive.infinitive[0].centerText =
    conjugations?.nonFinite?.infinitive?.active?.present?.join?.(',\n') ?? '-'
  structure.infinitive.infinitive.infinitive[1].centerText =
    conjugations?.nonFinite?.infinitive?.passive?.present?.join?.(',\n') ?? '-'
  structure.infinitive.infinitive.infinitive[2].centerText =
    conjugations?.nonFinite?.infinitive?.active?.perfect?.join?.(',\n') ?? '-'
  structure.infinitive.infinitive.infinitive[3].centerText =
    conjugations?.nonFinite?.infinitive?.passive?.perfect?.join?.(',\n') ?? '-'
  structure.infinitive.infinitive.infinitive[4].centerText =
    conjugations?.nonFinite?.infinitive?.active?.future?.join?.(',\n') ?? '-'
  structure.infinitive.infinitive.infinitive[5].centerText =
    conjugations?.nonFinite?.infinitive?.passive?.future?.join?.(',\n') ?? '-'

  structure['non finite']['non finite'].participle[0].centerText =
    conjugations?.nonFinite?.participle?.active?.present?.join?.(',\n') ?? '-'
  structure['non finite']['non finite'].participle[1].centerText =
    conjugations?.nonFinite?.participle?.passive?.perfect?.join?.(',\n') ?? '-'
  structure['non finite']['non finite'].participle[2].centerText =
    conjugations?.nonFinite?.participle?.active?.future?.join?.(',\n') ?? '-'
  structure['non finite']['non finite'].participle[3].centerText =
    conjugations?.nonFinite?.participle?.passive?.future?.join?.(',\n') ?? '-'
  structure['non finite']['non finite']['gerund/supine'][0].centerText =
    conjugations?.verbalNoun?.gerund?.genitive?.join?.(',\n') ?? '-'
  structure['non finite']['non finite']['gerund/supine'][1].centerText =
    conjugations?.verbalNoun?.gerund?.dative?.join?.(',\n') ?? '-'
  structure['non finite']['non finite']['gerund/supine'][2].centerText =
    conjugations?.verbalNoun?.gerund?.accusative?.join?.(',\n') ?? '-'
  structure['non finite']['non finite']['gerund/supine'][3].centerText =
    conjugations?.verbalNoun?.gerund?.ablative?.join?.(',\n') ?? '-'
  structure['non finite']['non finite']['gerund/supine'][4].centerText =
    conjugations?.verbalNoun?.supine?.accusative?.join?.(',\n') ?? '-'
  structure['non finite']['non finite']['gerund/supine'][5].centerText =
    conjugations?.verbalNoun?.supine?.ablative?.join?.(',\n') ?? '-'

  return structure
}
