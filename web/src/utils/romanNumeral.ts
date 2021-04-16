export function romanToDecimal(roman: string) {
  roman = roman.toUpperCase()
  let decimal = 0
  const value = (c: string): number =>
    (({
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    } as { [key: string]: number })[c])

  for (let i = 0; i < roman.length; i++) {
    let v1 = value(roman[i])
    if (i + 1 < roman.length && v1 < value(roman[i + 1])) decimal -= v1
    else decimal += v1
  }
  return decimal
}

export function decimalToRoman(decimal: number) {
  let roman = ""

  const thousands = Math.floor(decimal / 1000)
  if (thousands >= 4)
    throw new Error("Decimal number too large (>3999) for roman numerals")
  roman += new Array(thousands).fill("M").join("")

  const hundreds = Math.floor(decimal / 100)
  convertDigit(hundreds, "C", "D", "M")

  const tens = Math.floor((decimal % 100) / 10)
  convertDigit(tens, "X", "L", "C")

  const ones = decimal % 10
  convertDigit(ones, "I", "V", "X")

  return roman

  function convertDigit(digit: number, low: string, mid: string, top: string) {
    if (digit < 4) roman += new Array(digit).fill(low).join("")
    else if (digit === 4) roman += low + mid
    else if (digit < 9) roman += mid + new Array(digit - 5).fill(low).join("")
    else if (digit === 9) roman += low + top
  }
}

export function romanNumeralize(str: string | undefined) {
  if (!str) return ""
  return str.replace(/\d+/g, (d) => decimalToRoman(parseInt(d)))
}

export function decimalize(str: string | undefined) {
  if (!str) return ""
  return str.replace(
    /(^| )([IVXLCDM]+)( |$)/gi,
    (_, s, r, e) => s + romanToDecimal(r) + e,
  )
}
