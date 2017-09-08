import { expect } from "chai";
import "mocha";

import { Battle, Card, CardSuit, CardValue } from "../src/war";

describe("War Card Game", function () {
    it("should award the battle to the highest card", function () {
        let playerOne = new Card(CardValue.Two, CardSuit.Club);
        let playerTwo = new Card(CardValue.Three, CardSuit.Club);

        expect(Battle.play(playerOne, playerTwo)).to.equal(playerTwo);
        expect(Battle.play(playerTwo, playerOne)).to.equal(playerTwo);
    });

    it("should treat jacks as better than tens", function () {
        let playerOne = new Card(CardValue.Ten, CardSuit.Club);
        let playerTwo = new Card(CardValue.Jack, CardSuit.Club);

        expect(Battle.play(playerOne, playerTwo)).to.equal(playerTwo);
    });

    it("should treat queens as better than jacks", function () {
        let playerOne = new Card(CardValue.Jack, CardSuit.Club);
        let playerTwo = new Card(CardValue.Queen, CardSuit.Club);

        expect(Battle.play(playerOne, playerTwo)).to.equal(playerTwo);
    });

    it("should treat kings as better than queens", function () {
        let playerOne = new Card(CardValue.Queen, CardSuit.Club);
        let playerTwo = new Card(CardValue.King, CardSuit.Club);

        expect(Battle.play(playerOne, playerTwo)).to.equal(playerTwo);
    });

    it("should treat aces as better than kings", function () {
        let playerOne = new Card(CardValue.King, CardSuit.Club);
        let playerTwo = new Card(CardValue.Ace, CardSuit.Club);

        expect(Battle.play(playerOne, playerTwo)).to.equal(playerTwo);
    });

    it("should treat clubs as better than spades, if the card values are equal", function () {
        let playerOne = new Card(CardValue.Two, CardSuit.Spade);
        let playerTwo = new Card(CardValue.Two, CardSuit.Club);

        expect(Battle.play(playerOne, playerTwo)).to.equal(playerTwo);
    });

    it("should treat diamonds as better than clubs, if the card values are equal", function () {
        let playerOne = new Card(CardValue.Two, CardSuit.Club);
        let playerTwo = new Card(CardValue.Two, CardSuit.Diamond);

        expect(Battle.play(playerOne, playerTwo)).to.equal(playerTwo);
    });

    it("should treat hearts as better than diamonds, if the card values are equal", function () {
        let playerOne = new Card(CardValue.Two, CardSuit.Diamond);
        let playerTwo = new Card(CardValue.Two, CardSuit.Heart);

        expect(Battle.play(playerOne, playerTwo)).to.equal(playerTwo);
    });
});