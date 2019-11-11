const pad = (input: string, len: number): string => {
  while (input.length < len) { input = ` ${input} ` }
  return input.slice(0, len + 1)
}

const buildDiamond = (target: string): string[] => {
  const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const index: number = letters.indexOf(target)
  const width: number = index * 2 + 1

  const head: string[] = letters
    .slice(0, index + 1)
    .map((letter: string, index: number): string => {
        return (index === 0)
          ? letter
          : letter + pad(' ', Math.max(0, index * 2 - 1)) + letter
    })
    .map((row: string): string => pad(row, width))

  return [...head, ...[...head].slice(0, -1).reverse()]
}

export { buildDiamond }