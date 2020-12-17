export default function parseEtymology($: cheerio.Root, elt: any): string {
  const etymologyHeader = $(elt)
    .prevAll(':header:contains("Etymology")')
    .first()
  if (
    $(etymologyHeader).length <= 0 ||
    ($(etymologyHeader).next()[0] as any).name !== "p" ||
    !$(etymologyHeader).next().text().trim().length
  )
    return ""
  let etymology: string = $(etymologyHeader).next().text().trim()

  // const participle = etymology.match(
  //   /((present)|(perfect)|(future)) ((active)|(passive) )?participle (\(gerundive\) )?of [A-Za-z\u00C0-\u017F]+/i,
  // )
  // if (participle) this.translations.push(cap1(participle[0].trim()))

  return etymology
}