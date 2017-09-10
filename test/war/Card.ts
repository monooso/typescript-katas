import { expect } from "chai";
import "mocha";

import { Card } from "../../src/war/Card";
import { CardSuit } from "../../src/war/CardSuit";
import { CardValue } from "../../src/war/CardValue";

describe("Card", function () {
    it("should return a human-readable string representation of itself", function () {
        let card = new Card(CardValue.Three, CardSuit.Spades);

        expect(card.toString()).to.equal("Three of Spades");
    });
});