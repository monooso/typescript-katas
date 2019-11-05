import { expect } from "chai";
import "mocha";

import { chop } from "./../../src/karateChop";

describe("Karate Chop", () => {
    it("returns -1 if the haystack is empty", () => {
        expect(chop(1, [])).to.equal(-1)
    })

    it("returns -1 if the needle does not exist in the haystack", () => {
        expect(chop(1, [2])).to.equal(-1)
    })

    it("finds the needle at the start of the haystack", () => {
        expect(chop(1, [1, 2, 3, 4, 5])).to.equal(0)
    })

    it("finds the needle at the end of the haystack", () => {
        expect(chop(5, [1, 2, 3, 4, 5])).to.equal(4)
    })
})
