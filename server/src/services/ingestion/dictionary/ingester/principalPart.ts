import PrincipalPart from '../../../../entity/dictionary/word/PrincipalPart'
import Ingester from '../Ingester'

export default async function parsePrincipalParts(
  ingester: Ingester,
  $: cheerio.Root,
  elt: any,
  firstPrincipalPartName: string
): Promise<PrincipalPart[]> {
  const principalParts: PrincipalPart[] = []

  principalParts.push({
    name: firstPrincipalPartName,
    text: $(elt)
      .children('strong.Latn.headword')
      .get()
      .map((p1) => $(p1).text().toLowerCase()),
  } as PrincipalPart)

  for (const b of $(elt).children('b').get()) {
    if ($(b).prev('i').text() === 'or') {
      const lastPrincipalPart = principalParts.pop()
      if (!lastPrincipalPart) continue
      lastPrincipalPart.text = [
        ...lastPrincipalPart.text,
        $(b).text().toLowerCase(),
      ]
      principalParts.push(lastPrincipalPart)
    } else {
      principalParts.push({
        name: $(b).prev('i').text(),
        text: [$(b).text().toLowerCase()],
      } as PrincipalPart)
    }
  }

  if (!principalParts.length) throw new Error('no principle parts')
  ingester.macronizedWord = principalParts[0].text[0]
  return principalParts
}
