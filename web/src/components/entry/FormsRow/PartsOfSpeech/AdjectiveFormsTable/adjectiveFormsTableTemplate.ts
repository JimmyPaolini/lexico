const genderTable = [
  {
    topLeftText: 'nominative',
    topRightText: 'singular',
    centerText: '-',
  },
  {
    topRightText: 'plural',
    centerText: '-',
  },
  {
    topLeftText: 'genitive',
    centerText: '-',
  },
  { centerText: '-' },
  {
    topLeftText: 'dative',
    centerText: '-',
  },
  { centerText: '-' },
  {
    topLeftText: 'accusative',
    centerText: '-',
  },
  { centerText: '-' },
  {
    topLeftText: 'ablative',
    centerText: '-',
  },
  { centerText: '-' },
]

export const adjectiveFormsTableTemplate = {
  masculine: [...genderTable],
  feminine: [...genderTable],
  neuter: [...genderTable],
}
