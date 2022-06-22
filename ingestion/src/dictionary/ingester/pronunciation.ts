import { Pronunciation } from '../../../../entity/dictionary/word/Pronunciation'
import Ingester from '../Ingester'
import getClassicalPhonemes from './pronunciation/classical'
import {
  getEcclesiasticalPronunciations,
  parsePhonics,
} from './pronunciation/pronunciation'

export default function parsePronunciation(
  ingester: Ingester,
  $: cheerio.Root,
  elt: any,
  macronizedWord: string,
): Pronunciation {
  if (!macronizedWord) {
    ingester.ingestPrincipalParts()
    return ingester.ingestPronunciation()
  }

  const pronunciation = new Pronunciation()
  pronunciation.classical.phonemes = getClassicalPhonemes(macronizedWord)
  pronunciation.ecclesiastical.phonemes =
    getEcclesiasticalPronunciations(macronizedWord)[0]

  const pronunciationHeader = $(elt)
    .prevAll(':header:contains("Pronunciation")')
    .first()
  if ($(pronunciationHeader).length <= 0) return pronunciation

  for (const pr of $(pronunciationHeader).next('ul').children().get()) {
    if (
      $(pr)
        .text()
        .match(/^audio/i)
    )
      continue
    const pronunciations = $(pr).text().split('IPA(key):')[1]?.split(', ')
    if (!pronunciations) continue
    if ($(pr).find('a').text().includes('Classical')) {
      pronunciation.classical = {
        ...pronunciation.classical,
        ...parsePhonics(pronunciations),
      }
    } else if ($(pr).find('a').text().includes('Ecclesiastical')) {
      pronunciation.ecclesiastical = {
        ...pronunciation.ecclesiastical,
        ...parsePhonics(pronunciations),
      }
    } else if ($(pr).find('a').text().includes('Vulgar')) {
      pronunciation.vulgar = {
        ...pronunciation.vulgar,
        ...parsePhonics(pronunciations),
      }
    }
  }

  return pronunciation
}
