import { ComponentProps } from 'react'

import { AdjectiveDeclensionCard } from './AdjectiveDeclensionCard'

export const adjectiveDeclensionCardsData = [
  {
    id: 'first/second',
    title: 'Adjective First/Second Declension',
    description: '-us, -a, -um, to adverb: -e',
    forms: {
      masculine: {
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
      },
      feminine: {
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
      },
      neuter: {
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
          plural: ['-a'],
        },
      },
    },
  },
  {
    id: 'third',
    title: 'Adjective Third Declension',
    description: '-is, -e, to adverb: -ter',
    forms: {
      masculine: {
        nominative: {
          singular: ['-is'],
          plural: ['-ēs'],
        },
        genitive: {
          singular: ['-is'],
          plural: ['-ium'],
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
          singular: ['-ī', '-e'],
          plural: ['-ibus'],
        },
        vocative: {
          singular: ['-is'],
          plural: ['-ēs'],
        },
      },
      feminine: {
        nominative: {
          singular: ['-is'],
          plural: ['-ēs'],
        },
        genitive: {
          singular: ['-is'],
          plural: ['-ium'],
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
          singular: ['-ī', '-e'],
          plural: ['-ibus'],
        },
        vocative: {
          singular: ['-is'],
          plural: ['-ēs'],
        },
      },
      neuter: {
        nominative: {
          singular: ['-e'],
          plural: ['-ia'],
        },
        genitive: {
          singular: ['-is'],
          plural: ['-ium'],
        },
        dative: {
          singular: ['-ī'],
          plural: ['-ibus'],
        },
        accusative: {
          singular: ['-e'],
          plural: ['-ia'],
        },
        ablative: {
          singular: ['-ī'],
          plural: ['-ibus'],
        },
        vocative: {
          singular: ['-e'],
          plural: ['-ia'],
        },
      },
    },
  },
  {
    id: 'comparative',
    title: 'Adjective Comparative',
    description: '-ior, -ius, to adverb: -iore, -iore',
    forms: {
      masculine: {
        nominative: {
          singular: ['-ior'],
          plural: ['-iorēs'],
        },
        genitive: {
          singular: ['-ioris'],
          plural: ['-iorum'],
        },
        dative: {
          singular: ['-iorī'],
          plural: ['-ioribus'],
        },
        accusative: {
          singular: ['-iorem'],
          plural: ['-iorēs'],
        },
        ablative: {
          singular: ['-iore'],
          plural: ['-ioribus'],
        },
        vocative: {
          singular: ['-is'],
          plural: ['-iorēs'],
        },
      },
      feminine: {
        nominative: {
          singular: ['-ior'],
          plural: ['-iorēs'],
        },
        genitive: {
          singular: ['-ioris'],
          plural: ['-iorum'],
        },
        dative: {
          singular: ['-iorī'],
          plural: ['-ioribus'],
        },
        accusative: {
          singular: ['-iorem'],
          plural: ['-iorēs'],
        },
        ablative: {
          singular: ['-iore'],
          plural: ['-ioribus'],
        },
        vocative: {
          singular: ['-is'],
          plural: ['-iorēs'],
        },
      },
      neuter: {
        nominative: {
          singular: ['-ius'],
          plural: ['-iora'],
        },
        genitive: {
          singular: ['-ioris'],
          plural: ['-iorum'],
        },
        dative: {
          singular: ['-iorī'],
          plural: ['-ioribus'],
        },
        accusative: {
          singular: ['-iorus'],
          plural: ['-iora'],
        },
        ablative: {
          singular: ['-iorī'],
          plural: ['-ioribus'],
        },
        vocative: {
          singular: ['-iorus'],
          plural: ['-iora'],
        },
      },
    },
  },
] as ComponentProps<typeof AdjectiveDeclensionCard>[]
