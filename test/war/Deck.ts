import { expect } from "chai";
import "mocha";

import { Card } from "../../src/war/Card";
import { Deck } from "../../src/war/Deck";

describe("Deck", function () {
    it("should create a deck of cards", function () {
        expect((new Deck()).count()).to.equal(52);
    });

    it("should deal a card from the deck", function () {
        let deck = new Deck;
        let card = deck.deal();

        expect(card).to.be.instanceof(Card);
        expect(deck.count()).to.equal(51);
    });

    it("should throw an error when dealing from an empty deck", function () {
        let deck = new Deck;

        while (deck.count() > 0) {
            deck.deal();
        }

        expect(deck.deal.bind(deck)).to.throw(Error);
    });

    it("should shuffle the deck", function () {
        let deck = new Deck;
        let initial = deck.toString();

        deck.shuffle();

        expect(deck.toString()).to.not.equal(initial);
    });
});