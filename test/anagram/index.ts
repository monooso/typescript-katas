import { expect } from "chai"
import "mocha"
import { solveAnagram } from "./../../src/anagram"
import { full as dictionary } from "./../../src/anagram/dictionary"

describe("Anagram", () => {
  describe("solver", () => {
    it("returns an empty array if there are no solutions", () => {
      const word = "impossible"
      const wordlist = ["nope", "never", "nada"]

      const result = solveAnagram(word, wordlist)

      expect(result).to.be.an('array')
      expect(result).to.be.empty
    })

    it("returns the only possible solution", () => {
      const word = "inertia"
      const wordlist = ["air", "tine"]

      expect(solveAnagram(word, wordlist)).to.deep.equal(["air tine"])
    })

    it("is not swayed by red herrings", () => {
      const word = "comprehend"
      const wordlist = ["compere", "chomp", "ender"]

      expect(solveAnagram(word, wordlist)).to.deep.equal(["chomp ender"])
    })

    it("works with the original test case", () => {
      expect(solveAnagram("documenting", dictionary)).to.deep.equal(["document gin"])
    })
  })
})