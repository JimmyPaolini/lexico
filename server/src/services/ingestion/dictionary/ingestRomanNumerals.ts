import { toWords } from 'number-to-words'

import romanNumeralTemplate from '../../../data/dictionary/template/romanNumeral.json'
import Entry from '../../../entity/dictionary/Entry'
import Translation from '../../../entity/dictionary/Translation'
import PrincipalPart from '../../../entity/dictionary/word/PrincipalPart'
import log from '../../log'
import { decimalToRoman } from '../../romanNumeral'
import { createManual } from './ingestManual'

export default async function ingestRomanNumerals(): Promise<void> {
  log.info('ingesting roman numerals')
  for (let i = 1; i < 4000; i++) {
    const entry = romanNumeralTemplate as Entry & {
      principalParts: PrincipalPart[]
    }
    entry.id = decimalToRoman(i).toLowerCase() + ':100'
    entry.principalParts[0].text[0] = decimalToRoman(i).toLowerCase()
    entry.translations = [
      { translation: `Roman numeral: ${i} (${toWords(i)})` },
    ] as Translation[]
    await createManual(entry)
  }
  log.info('ingested roman numerals')
}
