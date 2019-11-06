import { expect } from "chai";
import "mocha";

import { cheatsheet, fizzbuzz } from "./../../src/fizzBuzz";

describe("Fizz Buzz", () => {
    describe("fizzbuzz", () => {
        it("returns 1 if the number is 1", () => {
            expect(fizzbuzz(1)).to.equal("1")
        })

        it("returns 2 if the number is 2", () => {
            expect(fizzbuzz(2)).to.equal("2")
        })

        it("returns 'Fizz' if the number is 3", () => {
            expect(fizzbuzz(3)).to.equal("Fizz")
        })

        it("returns 'Fizz' if the number is divisible by 3", () => {
            expect(fizzbuzz(69)).to.equal("Fizz")
        })

        it("returns 'Fizz' if the number contains a 3", () => {
            expect(fizzbuzz(23)).to.equal("Fizz")
        })

        it("returns 'Buzz' if the number is 5", () => {
            expect(fizzbuzz(5)).to.equal("Buzz")
        })

        it("returns 'Buzz' if the number is divisible by 5", () => {
            expect(fizzbuzz(520)).to.equal("Buzz")
        })

        it("returns 'Buzz' if the number contains a 5", () => {
            expect(fizzbuzz(52)).to.equal("Buzz")
        })

        it("returns 'FizzBuzz' if the number is divisible by 3 and 5", () => {
            expect(fizzbuzz(45)).to.equal("FizzBuzz")
        })
    })

    describe("cheatsheet", () => {
        it("returns a cheatsheet containing the first x answers", () => {
            expect(cheatsheet(15)).to.equal([
                "1",
                "2",
                "Fizz",
                "4",
                "Buzz",
                "Fizz",
                "7",
                "8",
                "Fizz",
                "Buzz",
                "11",
                "Fizz",
                "Fizz",
                "14",
                "FizzBuzz"
            ].join("\n"))
        })
    })
})
