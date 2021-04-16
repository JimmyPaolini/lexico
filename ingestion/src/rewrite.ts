import fs from "fs-extra"
import { romanToDecimal } from "../../web/src/utils/romanNumeral"

class Writing {
  fileName: string
  text: string

  constructor(fileName: string) {
    this.fileName = fileName
    this.text = fs.readFileSync(fileName, "utf8")
  }

  removeBlankLines() {
    this.text = this.text.replace(/^\n/gim, "")
    return this
  }

  splitLinesOnBracketedDecimals() {
    this.text = this.text
      .replace(/\n/gim, "")
      .replace(/\[(\D+)\]/gim, "")
      .replace(/\[(\d+)\]/gim, (_: any, lineLabel: string) => `\n#${lineLabel}`)
      .trim()
    return this
  }

  lineLabelBracketsToHashtags() {
    this.text = this.text.replace(
      /^\[([^\]]+)\] ?/gim,
      (_: any, lineLabel: string) => `#${lineLabel} `,
    )
    return this
  }

  lineLabelRomanToDecimal() {
    this.text = this.text.replace(
      /^#?([IVXLCDM]+)\.? ?/gim,
      (_: any, roman: string) => `#${romanToDecimal(roman)} `,
    )
    return this
  }

  logLabels() {
    console.log(this.text.split("\n").map((s: string) => s.match(/^\S+/)![0]))
    return this
  }

  logLines() {
    console.log(this.text.split("\n").join("\n\n"))
    return this
  }

  logText() {
    console.log(this.text)
    return this
  }

  writeFile() {
    fs.writeFileSync(this.fileName, this.text)
  }
}

const author = "cicero"
const book = "oratoria"
const text = "pro rabirio perduellionis reo"
new Writing(`../data/literature/${author}/${book}/${text}.txt`)
  .removeBlankLines()
  // .splitLinesOnBracketedDecimals()
  .lineLabelBracketsToHashtags()
  // .lineLabelRomanToDecimal()
  .logLabels()
  .logLines()
  .writeFile()
