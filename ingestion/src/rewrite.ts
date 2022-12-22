import fs from 'fs-extra'

import { romanToDecimal } from '../../web/src/utils/romanNumeral'

class Writing {
  fileName: string
  text: string

  constructor(fileName: string) {
    this.fileName = fileName
    this.text = fs.readFileSync(fileName, 'utf8')
  }

  clean() {
    this.text = this.text
      .replace(/\(\*\*\*\*\*\)/gim, '')
      .replace(/^\n/gim, '')
      .replace(/^\s+/gim, '')
      .replace(/\. \. \. ?/gim, '... ')
      .replace(/\[?M\.\]? (CICERO|TULLIUS)/gm, 'CICERO')
      .replace(/Cicero The Latin Library The Classics Page/, '')
    return this
  }

  splitLinesOnlyOnBracketedDecimals() {
    this.text = this.text
      .replace(/\n/gim, '')
      .replace(/\[(\D+)\] ?/gim, '')
      .replace(/\[(\d+)\]/gim, (_: any, lineLabel: string) => `\n#${lineLabel}`)
      .trim()
    return this
  }

  splitLinesOnBracketedDecimals() {
    this.text = this.text
      .replace(
        /\n?\[(\d+)\]/gim,
        (_: any, lineLabel: string) => `\n#${lineLabel}`
      )
      .trim()
    return this
  }

  splitLinesOnBracketedRomans() {
    this.text = this.text
      .replace(
        /\n?\[([IVXLCDM]+)\]/gm,
        (_: any, roman: string) => `\n\n#${romanToDecimal(roman)}`
      )
      .trim()
    return this
  }

  splitLinesOnParenthesizedDecimals() {
    this.text = this.text
      .replace(/\((\D+)\) ?/gim, '')
      .replace(
        /\n?\((\d+)\)/gim,
        (_: any, lineLabel: string) => `\n#${lineLabel}`
      )
      .trim()
    return this
  }

  splitLinesOnNakedDecimals() {
    this.text = this.text
      .replace(/\n?(\d+)/gim, (_: any, lineLabel: string) => `\n#${lineLabel}`)
      .trim()
    return this
  }

  splitLinesOnCustom() {
    this.text = this.text
      .replace(
        /\n?16\.(\d+)/gim,
        (_: any, lineLabel: string) => `\n\n#${lineLabel}`
      )
      .replace(/^\s+/, '')
      .trim()
    return this
  }

  lineStarterDecimalsToLineLabels() {
    this.text = this.text
      .replace(/^(\d+)/gim, (_: any, lineLabel: string) => `#${lineLabel}`)
      .trim()
    return this
  }

  removeBracketedDecimals() {
    this.text = this.text.replace(/\[\d+\]\s?/gim, '').trim()
    return this
  }

  splitLinesOnDecimalDots() {
    this.text = this.text
      .replace(
        /\n?(\d+)\. ?/gim,
        (_: any, lineLabel: string) => `\n#${lineLabel} `
      )
      .trim()
    return this
  }

  lineLabelBracketsToHashtags() {
    this.text = this.text.replace(
      /^\[([^\]]+)\]( +)?/gim,
      (_: any, lineLabel: string) => `#${lineLabel} `
    )
    return this
  }

  lineLabelDecimalDotsToHashtags() {
    this.text = this.text.replace(
      /^(\d+)\. ?/gim,
      (_: any, lineLabel: string) => `#${lineLabel} `
    )
    return this
  }

  lineLabelRomanToDecimal() {
    this.text = this.text.replace(
      /^#([IVXLCDM]+)\.?( +)?/gim,
      (_: any, roman: string) => `#${romanToDecimal(roman)} `
    )
    return this
  }

  romanLineStartersToLineLabels() {
    this.text = this.text
      .replace(
        /^([IVXLCDM]+)\.?\W/gim,
        (_: any, roman: string) => `\n#${romanToDecimal(roman)} `
      )
      .trim()
    return this
  }

  removeRomanLineStarters() {
    this.text = this.text.replace(/^[IVXLCDM]+\.?\W/gim, '')
    return this
  }

  removeDecimalStarters() {
    this.text = this.text.replace(/^\d+\.?\W/gim, '')
    return this
  }

  removeTagsOnWords() {
    this.text = this.text.replace(/<([^>]+)>/gim, (_: any, w: string) => w)
    return this
  }

  logLabels() {
    console.log(this.text.split('\n').map((s: string) => s.match(/^\S+/)?.[0]))
    return this
  }

  logLines() {
    console.log(this.text.split('\n').join('\n\n'))
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

const author = 'cicero'
const book = 'ad familiares'
const text = 'book 16'
new Writing(`../data/literature/${author}/${book}/${text}.txt`)
  .clean()
  .removeTagsOnWords()
  // .removeRomanLineStarters()
  // .removeDecimalStarters()
  // .removeBracketedDecimals()
  // .splitLinesOnDecimalDots()
  // .splitLinesOnBracketedDecimals()
  // .splitLinesOnBracketedRomans()
  // .splitLinesOnParenthesizedDecimals()
  // .splitLinesOnNakedDecimals()
  // .splitLinesOnCustom()
  // .lineLabelBracketsToHashtags()
  .romanLineStartersToLineLabels()
  // .lineLabelRomanToDecimal()
  // .lineStarterDecimalsToLineLabels()
  .logLabels()
  .writeFile()
