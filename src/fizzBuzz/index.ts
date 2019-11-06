export function fizzbuzz(current: number): string {
  let output: string = ""

  if (current % 3 === 0 || current.toString().includes('3')) {
    output += "Fizz"
  }

  if (current % 5 === 0 || current.toString().includes('5')) {
    output += "Buzz"
  }

  return output || current.toString()
}

export function cheatsheet(limit: number): string {
  return ([...Array(limit)])
    .map((value: any, index: number) => {
      return fizzbuzz(index + 1)
    })
    .join("\n")
}