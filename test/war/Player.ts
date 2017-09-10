import { expect } from "chai";
import "mocha";

import { Card } from "../../src/war/Card";
import { CardSuit } from "../../src/war/CardSuit";
import { CardValue } from "../../src/war/CardValue";
import { Player } from "../../src/war/Player";

describe("Player", function () {
    it("should add a card to the hand", function () {
        let john = new Player('John');

        john.receiveCard(new Card(CardValue.Ace, CardSuit.Hearts));

        expect(john.hand.count()).to.equal(1);
    });

    it("should play a card", function () {
        let john = new Player('John');
        let card = new Card(CardValue.Eight, CardSuit.Diamonds);

        john.receiveCard(card);

        expect(john.playCard()).to.equal(card);
    });

    it("should throw an error when playing a card from an empty hand", function () {
        let john = new Player('John');

        expect(john.playCard.bind(john)).to.throw(Error);
    });
});