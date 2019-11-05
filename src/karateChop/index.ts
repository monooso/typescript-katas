/**
 * Get the index of the given needle in the given haystack
 *
 * Returns -1 if the needle does not exist in the haystack.
 *
 * @param needle The value to search for
 * @param haystack A sorted array of integers
 *
 * @return {number}
 */
export function chop(needle: number, haystack: number[]): number {
  const seek = (needle: number, haystack: number[], start: number): number => {
    if (haystack.length === 0) {
      return -1
    }

    const index = Math.floor(haystack.length / 2)

    if (needle === haystack[index]) {
      return start + index
    }

    return (needle < haystack[index])
      ? seek(needle, haystack.slice(0, index), start)
      : seek(needle, haystack.slice(index + 1), start + index + 1)
  }

  return seek(needle, haystack, 0)
}