const sortString = (input: string): string => input.toLowerCase().split('').sort().join('')

const findAnagramPairs = (target: string, base: string, dictionary: string[]): string[] => {
  if (dictionary.length === 0) { return [] }

  const matches: string[] = dictionary.reduce((previous: string[], pair: string): string[] => {
    if (target === sortString(base + pair)) {
      previous.push([base, pair].sort().join(' '))
    }

    return previous
  }, [])

  return [...matches, ...findAnagramPairs(target, dictionary.pop() as string, dictionary)]
}

const solveAnagram = (target: string, dictionary: string[]): string[] => {
  dictionary = [...new Set(dictionary)]
    .filter((word: string): boolean => (word.length < target.length))
    .map((word: string): string => word.toLowerCase())

  target = sortString(target)

  return findAnagramPairs(target, dictionary.pop() as string, dictionary)
}

export { solveAnagram }