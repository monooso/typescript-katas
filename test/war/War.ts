import { expect } from "chai";
import "mocha";

import { Deck } from "../../src/war/Deck";
import { Player } from "../../src/war/Player";
import { War } from "../../src/war/War";

describe("War", function () {
    let deck: Deck;
    let john: Player;
    let jane: Player;

    beforeEach(function () {
        deck = new Deck;
        john = new Player('John');
        jane = new Player('Jane');
    });

    it("should deal the cards to the players", function () {
        let game: War = new War(deck, john, jane);

        expect(john.hand.count()).to.equal(26);
        expect(jane.hand.count()).to.equal(26);
    });

    it("should award the battle cards to the winning player", function () {
        let game: War = new War(deck, john, jane);

        game.battle();
        expect(Math.abs(john.hand.count() - jane.hand.count())).to.equal(2);
    });

    it("should throw an error when attempting to battle after the war is won", function () {
        while (deck.count() > 2) {
            deck.deal();
        }

        let game: War = new War(deck, john, jane);

        game.battle();

        expect(game.battle.bind(game)).to.throw(Error);
    });

    it("should recognise when the war is won", function () {
        while (deck.count() > 2) {
            deck.deal();
        }

        let game: War = new War(deck, john, jane);

        game.battle();

        expect(game.isFinished()).to.be.true;
    });

    it("should return the winner", function () {
        while (deck.count() > 2) {
            deck.deal();
        }

        let game: War = new War(deck, john, jane);

        game.battle();

        if (john.hand.count() > 0) {
            expect(game.getWinner()).to.equal(john);
        } else {
            expect(game.getWinner()).to.equal(jane);
        }
    });

    it("should throw an error when attempting to determine the winner of an unfinished game", function () {
        let game: War = new War(deck, john, jane);

        expect(game.getWinner.bind(game)).to.throw(Error);
    });
});