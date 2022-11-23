const verbSextet = [
  {
    topLeftText: 'first',
    topRightText: 'singular',
    centerText: '-',
  },
  {
    topRightText: 'plural',
    centerText: '-',
  },
  {
    topLeftText: 'second',
    centerText: '-',
  },
  { centerText: '-' },
  {
    topLeftText: 'third',
    centerText: '-',
  },
  { centerText: '-' },
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
          topRightText: 'plural',
          topLeftText: 'second',
          bottomLeftText: 'present',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'third',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'third',
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
          topRightText: 'plural',
          topLeftText: 'second',
          bottomLeftText: 'present',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'second',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'third',
          bottomLeftText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'third',
          bottomLeftText: 'future',
          centerText: '-',
        },
      ],
    },
  },
  infinitive: {
    infinitive: {
      infinitive: [
        {
          topLeftText: 'present',
          topRightText: 'active',
          centerText: '-',
        },
        {
          topRightText: 'passive',
          centerText: '-',
        },
        {
          topLeftText: 'perfect',
          centerText: '-',
        },
        { centerText: '-' },
        {
          topLeftText: 'future',
          centerText: '-',
        },
        { centerText: '-' },
      ],
    },
  },
  'non finite': {
    'non finite': {
      participle: [
        {
          topLeftText: 'active',
          topRightText: 'present',
          centerText: '-',
        },
        {
          topLeftText: 'passive',
          topRightText: 'perfect',
          centerText: '-',
        },
        {
          topLeftText: 'active',
          topRightText: 'future',
          centerText: '-',
        },
        {
          topLeftText: 'passive',
          topRightText: 'future',
          centerText: '-',
        },
        { centerText: '-' },
        { centerText: '-' },
      ],
      'gerund/supine': [
        {
          topLeftText: 'gerund',
          topRightText: 'genitive',
          centerText: '-',
        },
        {
          topLeftText: 'gerund',
          topRightText: 'dative',
          centerText: '-',
        },
        {
          topLeftText: 'gerund',
          topRightText: 'accusative',
          centerText: '-',
        },
        {
          topLeftText: 'gerund',
          topRightText: 'ablative',
          centerText: '-',
        },
        {
          topLeftText: 'supine',
          topRightText: 'accusative',
          centerText: '-',
        },
        {
          topLeftText: 'supine',
          topRightText: 'ablative',
          centerText: '-',
        },
      ],
    },
  },
}
