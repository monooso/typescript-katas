import { expect } from "chai";
import "mocha";

import { Battle } from "../../src/war/Battle";
import { Card } from "../../src/war/Card";
import { CardSuit } from "../../src/war/CardSuit";
import { CardValue } from "../../src/war/CardValue";

describe("Battle", function () {
    it("should award the battle to the highest card", function () {
        let one = new Card(CardValue.Two, CardSuit.Clubs);
        let two = new Card(CardValue.Three, CardSuit.Clubs);

        expect(Battle.play(one, two)).to.equal(two);
        expect(Battle.play(two, one)).to.equal(two);
    });

    it("should treat jacks as better than tens", function () {
        let one = new Card(CardValue.Ten, CardSuit.Clubs);
        let two = new Card(CardValue.Jack, CardSuit.Clubs);

        expect(Battle.play(one, two)).to.equal(two);
    });

    it("should treat queens as better than jacks", function () {
        let one = new Card(CardValue.Jack, CardSuit.Clubs);
        let two = new Card(CardValue.Queen, CardSuit.Clubs);

        expect(Battle.play(one, two)).to.equal(two);
    });

    it("should treat kings as better than queens", function () {
        let one = new Card(CardValue.Queen, CardSuit.Clubs);
        let two = new Card(CardValue.King, CardSuit.Clubs);

        expect(Battle.play(one, two)).to.equal(two);
    });

    it("should treat aces as better than kings", function () {
        let one = new Card(CardValue.King, CardSuit.Clubs);
        let two = new Card(CardValue.Ace, CardSuit.Clubs);

        expect(Battle.play(one, two)).to.equal(two);
    });

    it("should treat clubs as better than spades, if the card values are equal", function () {
        let one = new Card(CardValue.Two, CardSuit.Spades);
        let two = new Card(CardValue.Two, CardSuit.Clubs);

        expect(Battle.play(one, two)).to.equal(two);
    });

    it("should treat diamonds as better than clubs, if the card values are equal", function () {
        let one = new Card(CardValue.Two, CardSuit.Clubs);
        let two = new Card(CardValue.Two, CardSuit.Diamonds);

        expect(Battle.play(one, two)).to.equal(two);
    });

    it("should treat hearts as better than diamonds, if the card values are equal", function () {
        let one = new Card(CardValue.Two, CardSuit.Diamonds);
        let two = new Card(CardValue.Two, CardSuit.Hearts);

        expect(Battle.play(one, two)).to.equal(two);
    });
});