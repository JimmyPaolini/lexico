import Translation from '../../../../entity/dictionary/Translation'
import { capitalizeFirstLetter } from '../../../string'
import Ingester from '../Ingester'

export default function parseEtymology(
  ingester: Ingester,
  $: cheerio.Root,
  elt: any
): string {
  const etymologyHeader = $(elt)
    .prevAll(':header:contains("Etymology")')
    .first()
  if (
    $(etymologyHeader).length <= 0 ||
    ($(etymologyHeader).next()[0] as any).name !== 'p' ||
    !$(etymologyHeader).next().text().trim().length
  ) {
    return ''
  }
  const etymology: string = $(etymologyHeader).next().text().trim()

  const participleMatch = etymology.match(
    /((present)|(perfect)|(future)) ((active)|(passive) )?participle (\(gerundive\) )?of [A-Za-z\u00C0-\u017F]+/i
  )
  if (participleMatch) {
    const text = capitalizeFirstLetter(participleMatch[0].trim())
    ingester.translations.push(new Translation(text, ingester.entry))
  }

  return etymology
}
