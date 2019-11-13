const lookup: { [index: number]: string } = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'fourty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety'
}

const multiples: { [index: number]: string } = {
  100: 'hundred'
}

const toWords = (num: number): string[] => {
  if (lookup[num]) { return [lookup[num]] }

  const factor: number = Math.pow(10, new String(num).length - 1)
  const remainder: number = num % factor

  return num < 100
    ? [...toWords(num - remainder), ...toWords(remainder)]
    : [...toWords(Math.floor(num / factor)), multiples[100], ...toWords(remainder)]
}

const numberToWords = (num: number): string => {
  let words = toWords(num)

  if (words.length > 1) {
    words = words.filter((word: string): boolean => word !== 'zero')
  }

  return words.join(' ')
}

export { numberToWords }