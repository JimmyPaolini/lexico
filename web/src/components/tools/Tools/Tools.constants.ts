import { useMacronizeQuery } from 'src/graphql/generated'

export const TOOLS = {
  macronize: {
    name: 'macronize',
    label: 'Macronize',
    action: async (text: string) => {
      const { macronize } = await useMacronizeQuery.fetcher({ text })()
      return macronize
    },
  },
  demacronize: {
    name: 'demacronize',
    label: 'Demacronize',
    action: async (text: string) =>
      text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/æ/g, 'ae'),
  },
  capitalize: {
    name: 'capitalize',
    label: 'Capitalize',
    action: async (text: string) => text.toUpperCase(),
  },
  uncapitalize: {
    name: 'uncapitalize',
    label: 'Uncapitalize',
    action: async (text: string) => text.toLowerCase(),
  },
  u2v: {
    name: 'u2v',
    label: 'u to v',
    action: async (text: string) =>
      text
        .replace(/u/gm, 'v')
        .replace(/U/gm, 'V')
        .replace(/ū/gm, 'v̄')
        .replace(/Ū/gm, 'V̄'),
  },
  i2j: {
    name: 'i2j',
    label: 'i to j',
    action: async (text: string) =>
      text
        .replace(/i/gm, 'j')
        .replace(/I/gm, 'J')
        .replace(/ī/gm, 'j̄')
        .replace(/Ī/gm, 'J̄'),
  },
}
