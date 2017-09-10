import { expect } from "chai";
import "mocha";

import { isLeap } from "./../../src/leapYear";

describe("Leap Year", function () {
    it("returns false if the year is not divisible by 4", function () {
        expect(isLeap(2001)).to.be.false;
    });

    it("returns true if the year is divisible by 4, but not by 100", function () {
        expect(isLeap(1996)).to.be.true;
    });

    it("return false if the year is divisible by 4 and 100, but not by 400", function () {
        expect(isLeap(1900)).to.be.false;
    });

    it("return true if the year is divisible by 4 and 100 and 400", function () {
        expect(isLeap(2000)).to.be.true;
    });
});