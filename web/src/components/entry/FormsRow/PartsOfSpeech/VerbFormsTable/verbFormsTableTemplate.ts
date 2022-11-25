const verbSextet = [
  { topLeftText: 'first', topRightText: 'singular', centerText: '-' },
  { topLeftText: 'first', topRightText: 'plural', centerText: '-' },
  { topLeftText: 'second', topRightText: 'singular', centerText: '-' },
  { topLeftText: 'second', topRightText: 'plural', centerText: '-' },
  { topLeftText: 'third', topRightText: 'singular', centerText: '-' },
  { topLeftText: 'third', topRightText: 'plural', centerText: '-' },
]

export const verbFormsTableTemplate = {
  indicative: {
    present: {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
    imperfect: {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
    future: {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
    perfect: {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
    pluperfect: {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
    'future perfect': {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
  },
  subjunctive: {
    present: {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
    imperfect: {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
    perfect: {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
    pluperfect: {
      active: JSON.parse(JSON.stringify(verbSextet)),
      passive: JSON.parse(JSON.stringify(verbSextet)),
    },
  },
  imperative: {
    imperative: {
      active: [
        {
          topLeftText: 'second',
          topRightText: 'singular',
          bottomLeftText: 'present',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          topRightText: 'plural',
          bottomLeftText: 'present',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          topRightText: 'singular',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          topRightText: 'plural',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'third',
          topRightText: 'singular',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'third',
          topRightText: 'plural',
          bottomLeftText: 'future',
          centerText: '-',
        },
      ],
      passive: [
        {
          topLeftText: 'second',
          topRightText: 'singular',
          bottomLeftText: 'present',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          topRightText: 'plural',
          bottomLeftText: 'present',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          topRightText: 'singular',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          topRightText: 'plural',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'third',
          topRightText: 'singular',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'third',
          topRightText: 'plural',
          bottomLeftText: 'future',
          centerText: '-',
        },
      ],
    },
  },
  infinitive: {
    infinitive: {
      infinitive: [
        { topLeftText: 'present', topRightText: 'active', centerText: '-' },
        { topLeftText: 'present', topRightText: 'passive', centerText: '-' },
        { topLeftText: 'perfect', topRightText: 'active', centerText: '-' },
        { topLeftText: 'perfect', topRightText: 'passive', centerText: '-' },
        { topLeftText: 'future', topRightText: 'active', centerText: '-' },
        { topLeftText: 'future', topRightText: 'passive', centerText: '-' },
      ],
    },
  },
  'non finite': {
    'non finite': {
      participle: [
        { topLeftText: 'active', topRightText: 'present', centerText: '-' },
        { topLeftText: 'passive', topRightText: 'perfect', centerText: '-' },
        { topLeftText: 'active', topRightText: 'future', centerText: '-' },
        { topLeftText: 'passive', topRightText: 'future', centerText: '-' },
        { centerText: '-' },
        { centerText: '-' },
      ],
      'gerund/supine': [
        { topLeftText: 'gerund', topRightText: 'genitive', centerText: '-' },
        { topLeftText: 'gerund', topRightText: 'dative', centerText: '-' },
        { topLeftText: 'gerund', topRightText: 'accusative', centerText: '-' },
        { topLeftText: 'gerund', topRightText: 'ablative', centerText: '-' },
        { topLeftText: 'supine', topRightText: 'accusative', centerText: '-' },
        { topLeftText: 'supine', topRightText: 'ablative', centerText: '-' },
      ],
    },
  },
}
