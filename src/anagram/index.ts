const sortString = (input: string): string => normalizeString(input).split('').sort().join('')

const normalizeString = (input: string): string => input.toLowerCase()

const deduplicateArray = (input: any[]): any[] => [...new Set(input)]

const normalizeDictionary = (input: string[]): string[] => {
  return deduplicateArray(input).map((word: string): string => normalizeString(word))
}

const optimizeDictionary = (anagramWord: string, dictionary: string[]): string[] => {
  return dictionary.filter((word: string): boolean => (word.length <= anagramWord.length))
}

const flattenArray = (nested: any[]): any[] => [].concat(...nested)

const solveAnagram = (anagramWord: string, dictionary: string[]): string[] => {
  anagramWord = sortString(anagramWord)
  dictionary = optimizeDictionary(anagramWord, normalizeDictionary(dictionary))

  const solutions: Array<string[]> = dictionary.map((
    baseWord: string,
    index: number,
    dictionary: string[]
  ): string[] => {
    return dictionary.slice(index + 1)
      .filter((pairWord: string): boolean => (anagramWord === sortString(baseWord + pairWord)))
      .map((pairWord: string): string => [baseWord, pairWord].sort().join(' '))
  })

  return deduplicateArray(flattenArray(solutions)).sort()
}

export { solveAnagram }