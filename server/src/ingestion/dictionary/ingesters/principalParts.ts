import PrincipalPart from "../../../entity/PrincipalPart"
import Ingester from "../Ingester"

export default function parsePrincipalParts(
  ingester: Ingester,
  $: cheerio.Root,
  elt: any,
  firstPrincipalPartName: string,
): PrincipalPart[] {
  let principalParts: PrincipalPart[] = []

  principalParts.push({
    name: firstPrincipalPartName,
    text: $(elt)
      .children("strong.Latn.headword")
      .get()
      .map((p1) => $(p1).text().toLowerCase())
      .join(" or "),
  } as PrincipalPart)

  for (const b of $(elt).children("b").get()) {
    if ($(b).prev("i").text() === "or") {
      const lastPrincipalPart = principalParts.pop()
      if (!lastPrincipalPart) continue
      lastPrincipalPart.text += ` or ${$(b).text().toLowerCase()}`
      principalParts.push(lastPrincipalPart)
    } else {
      principalParts.push({
        name: $(b).prev("i").text(),
        text: $(b).text().toLowerCase(),
      } as PrincipalPart)
    }
  }

  ingester.macronizedWord = principalParts[0].text
  return principalParts
}
