const lookup: { [index: number]: string } = {
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
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety'
}

const multiples: { [index: number]: string } = {
  100: 'hundred',
  1_000: 'thousand',
  1_000_000: 'million'
}

const chunkToWords = (num: number, suffix: string = ''): string[] => {
  if (num === 0) { return [] }
  if (lookup[num]) { return [lookup[num], suffix] }

  const factor: number = Math.pow(10, new String(num).length - 1)
  const remainder: number = num % factor

  let words = num < 100
    ? [...chunkToWords(num - remainder), ...chunkToWords(remainder)]
    : [...chunkToWords(Math.floor(num / factor)), multiples[100], ...chunkToWords(remainder)]

  words = words.filter((word: string): boolean => word.length > 0)

  return suffix ? [...words, suffix] : words
}

/**
 * Split a number into thousands
 *
 * Example:
 * 12,345,678 -> [12, 345, 678]
 */
const chunkNumber = (num: number): number[] => {
  return [...num.toString()]
    .reverse()
    .join('')
    .split(/(\d{3})/)
    .filter((chunk: string): boolean => chunk.length > 0)
    .map((chunk: string): string => [...chunk].reverse().join(''))
    .map((chunk: string): number => Number.parseInt(chunk))
    .reverse()
}

const numberToWords = (num: number): string => {
  if (num === 0) { return 'zero' }

  return chunkNumber(num)
    .reverse()
    .map((num: number, index: number): string[] => {
      let words = index === 0
        ? chunkToWords(num)
        : chunkToWords(num, multiples[Math.pow(10, index * 3)])

      return num > 100
        ? words.map((word: string): string => word.replace('hundred', 'hundred and'))
        : words
    })
    .map((words: string[]): string => words.join(' ').trim())
    .filter((word: string): boolean => word.length > 0)
    .reverse()
    .join(', ')
}

export { numberToWords }