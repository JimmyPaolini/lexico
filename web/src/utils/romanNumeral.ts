export function romanToDecimal(roman: string): number {
  roman = roman.toUpperCase()
  let decimal = 0
  const value = (c: string): number =>
    ((
      {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
      } as Record<string, number>
    )[c])

  for (let i = 0; i < roman.length; i++) {
    const v1 = value(roman[i])
    if (i + 1 < roman.length && v1 < value(roman[i + 1])) decimal -= v1
    else decimal += v1
  }
  return decimal
}

export function decimalToRoman(decimal: number): string {
  let roman = ''
  if (decimal > 3999) {
    throw new Error('Decimal number too large (>3999) for roman numerals')
  }
  function convertDigit(digit: number, low: string, mid: string, top: string) {
    if (digit < 4) roman += new Array(digit).fill(low).join('')
    else if (digit === 4) roman += low + mid
    else if (digit < 9) roman += mid + new Array(digit - 5).fill(low).join('')
    else if (digit === 9) roman += low + top
  }

  const thousands = Math.floor((decimal % 10000) / 1000)
  convertDigit(thousands, 'M', '', '')

  const hundreds = Math.floor((decimal % 1000) / 100)
  convertDigit(hundreds, 'C', 'D', 'M')

  const tens = Math.floor((decimal % 100) / 10)
  convertDigit(tens, 'X', 'L', 'C')

  const ones = Math.floor((decimal % 10) / 1)
  convertDigit(ones, 'I', 'V', 'X')

  return roman
}

export function romanNumeralize(str: string | undefined): string {
  if (!str) return ''
  return str.replace(/\d+/g, (d) => decimalToRoman(parseInt(d)))
}

export function decimalize(str: string | undefined): string {
  if (!str) return ''
  return str.replace(
    /(^| )([IVXLCDM]+)( |$)/gi,
    (_, s: string, r: string, e: string) => s + String(romanToDecimal(r)) + e,
  )
}
