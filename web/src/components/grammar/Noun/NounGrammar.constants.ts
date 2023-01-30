export const nounGrammarData = [
  {
    id: '1st',
    title: 'First Declension',
    description: '-a, -ae, usually feminine',
    forms: {
      nominative: {
        singular: ['-a'],
        plural: ['-ae'],
      },
      genitive: {
        singular: ['-ae'],
        plural: ['-ārum'],
      },
      dative: {
        singular: ['-ae'],
        plural: ['-īs'],
      },
      accusative: {
        singular: ['-am'],
        plural: ['-ās'],
      },
      ablative: {
        singular: ['-ā'],
        plural: ['-īs'],
      },
      vocative: {
        singular: ['-a'],
        plural: ['-ae'],
      },
      locative: {
        singular: ['-ae'],
        plural: ['-īs'],
      },
    },
  },
  {
    id: '2nd',
    title: 'Second Declension',
    description: '-us, -i, always masculine',
    forms: {
      nominative: {
        singular: ['-us'],
        plural: ['-ī'],
      },
      genitive: {
        singular: ['-ī'],
        plural: ['-ōrum'],
      },
      dative: {
        singular: ['-ō'],
        plural: ['-īs'],
      },
      accusative: {
        singular: ['-um'],
        plural: ['-ōs'],
      },
      ablative: {
        singular: ['-ō'],
        plural: ['-īs'],
      },
      vocative: {
        singular: ['-e'],
        plural: ['-ī'],
      },
      locative: {
        singular: ['-ī'],
        plural: ['-īs'],
      },
    },
  },
  {
    id: '2nd neu',
    title: 'Second Declension Neuter',
    description: '-um, -i, always neuter',
    forms: {
      nominative: {
        singular: ['-um'],
        plural: ['-a'],
      },
      genitive: {
        singular: ['-ī'],
        plural: ['-ōrum'],
      },
      dative: {
        singular: ['-ō'],
        plural: ['-īs'],
      },
      accusative: {
        singular: ['-um'],
        plural: ['-a'],
      },
      ablative: {
        singular: ['-ō'],
        plural: ['-īs'],
      },
      vocative: {
        singular: ['-um'],
        plural: ['a'],
      },
      locative: {
        singular: ['-ī'],
        plural: ['-īs'],
      },
    },
  },
  {
    id: '3rd m/f',
    title: 'Third Declension Masculine/Feminine',
    description: '-r/o/x/s, -is, masculine or feminine',
    forms: {
      nominative: {
        singular: ['-r, -o, -x, -s'],
        plural: ['-ēs'],
      },
      genitive: {
        singular: ['-is'],
        plural: ['-um'],
      },
      dative: {
        singular: ['-ī'],
        plural: ['-ibus'],
      },
      accusative: {
        singular: ['-em'],
        plural: ['-ēs'],
      },
      ablative: {
        singular: ['-e'],
        plural: ['-ibus'],
      },
      vocative: {
        singular: ['-r, -o, -x, -s'],
        plural: ['a'],
      },
      locative: {
        singular: ['-e', '-ī'],
        plural: ['-ibus'],
      },
    },
  },
  {
    id: '3rd neu',
    title: 'Third Declension Neuter',
    description: '-r/o/x/s, -is, always neuter',
    forms: {
      nominative: {
        singular: ['-r, -o, -x, -s'],
        plural: ['-a'],
      },
      genitive: {
        singular: ['-is'],
        plural: ['-um'],
      },
      dative: {
        singular: ['-ī'],
        plural: ['-ibus'],
      },
      accusative: {
        singular: ['-r, -o, -x, -s'],
        plural: ['-a'],
      },
      ablative: {
        singular: ['-e', '-i'],
        plural: ['-ibus'],
      },
      vocative: {
        singular: ['-r, -o, -x, -s'],
        plural: ['a'],
      },
      locative: {
        singular: ['-e', '-ī'],
        plural: ['-ibus'],
      },
    },
  },
  {
    id: '4th',
    title: 'Fourth Declension',
    description: '-us, ūs, usually masculine, sometimes feminine/neuter',
    forms: {
      nominative: {
        singular: ['us'],
        plural: ['ūs'],
      },
      genitive: {
        singular: ['ūs'],
        plural: ['uum'],
      },
      dative: {
        singular: ['uī'],
        plural: ['ibus'],
      },
      accusative: {
        singular: ['um'],
        plural: ['ūs'],
      },
      ablative: {
        singular: ['ū'],
        plural: ['ibus'],
      },
      vocative: {
        singular: ['us'],
        plural: ['ūs'],
      },
      locative: {
        singular: ['-ī'],
        plural: ['-ibus'],
      },
    },
  },
  {
    id: '5th',
    title: 'Fifth Declension',
    description: '-ēs, -ēi, usually masculine, sometimes feminine',
    forms: {
      nominative: {
        singular: ['-ēs'],
        plural: ['-ēs'],
      },
      genitive: {
        singular: ['-eī'],
        plural: ['-ērum'],
      },
      dative: {
        singular: ['-eī'],
        plural: ['-ēbus'],
      },
      accusative: {
        singular: ['-em'],
        plural: ['-ēs'],
      },
      ablative: {
        singular: ['-ē'],
        plural: ['-ēbus'],
      },
      vocative: {
        singular: ['-ēs'],
        plural: ['-ēs'],
      },
      locative: {
        singular: ['-ē'],
        plural: ['-ēbus'],
      },
    },
  },
  {
    id: 'trans',
    title: 'Translations',
    description: 'Generalizations for each form',
    forms: {
      nominative: {
        singular: ['noun'],
        plural: ['nouns'],
      },
      genitive: {
        singular: ["noun's, of noun"],
        plural: ["nouns', of nouns"],
      },
      dative: {
        singular: ['to/for noun'],
        plural: ['to/for nouns'],
      },
      accusative: {
        singular: ['noun'],
        plural: ['nouns'],
      },
      ablative: {
        singular: ['by/with noun'],
        plural: ['by/with nouns'],
      },
      vocative: {
        singular: ['noun!'],
        plural: ['noun!'],
      },
      locative: {
        singular: ['at noun'],
        plural: ['at nouns'],
      },
    },
  },
]
