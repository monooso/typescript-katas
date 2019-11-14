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

/**
 * Convert the given number 'chunk' to words
 *
 * Note that the chunk will never be more than 999.
 */
const chunkToWords = (chunk: number): string[] => {
  if (chunk === 0) { return [] }
  if (lookup[chunk]) { return [lookup[chunk]] }

  const factor: number = Math.pow(10, new String(chunk).length - 1)
  const remainder: number = chunk % factor

  let words = chunk < 100
    ? [...chunkToWords(chunk - remainder), ...chunkToWords(remainder)]
    : [...chunkToWords(Math.floor(chunk / factor)), multiples[100], ...chunkToWords(remainder)]

  return words
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

const addMultiplierSuffix = (words: string[], index: number): string[] => {
  return index > 0 ? [...words, multiples[Math.pow(10, index * 3)]] : words
}

const implodeChunkWords = (words: string[]): string => words.join(' ').trim()

const implodeChunks = (words: string[]): string => words.length > 2 ? words.join(', ') : words.join(' ')

const discardEmptyWords = (word: string): boolean => word.trim().length > 0

/**
 * Process a single number chunk
 *
 * @param chunk The number to process
 * @param index The index of the chunk in the array of chunks
 * @param allChunks The array of chunks
 */
const processChunk = (chunk: number, index: number, allChunks: number[]): string[] => {
  let words: string[] = chunkToWords(chunk).filter(discardEmptyWords)

  if (words.length === 0) { return words }

  /**
   * Tricky:
   * If there is more than one chunk, this is the first, and it's less than 100,
   * add the prefix 'and'.
   *
   * This takes care of situations such as 'one million and one'.
   */
  if (allChunks.length > 1 && index === 0 && chunk < 100) {
    words.unshift('and')
    return words
  }

  // If chunk is greater than one hundred, add the 'and' to 'x hundred and y'
  return chunk > 100
    ? words.map((word: string): string => word.replace('hundred', 'hundred and'))
    : words
}

/**
 * Convert the given number to words
 *
 * Example:
 * 12,345,026 -> twelve million, three hundred and forty five thousand, and twenty six
 */
const numberToWords = (num: number): string => {
  if (num === 0) { return 'zero' }

  const words: string[] = chunkNumber(num)
    .reverse()
    .map(processChunk)
    .map(addMultiplierSuffix)
    .map(implodeChunkWords)
    .filter(discardEmptyWords)
    .reverse()

  return implodeChunks(words)
}

export { numberToWords }