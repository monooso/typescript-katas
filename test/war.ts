import { expect } from "chai";
import "mocha";

import { Battle, Card, CardSuit, CardValue, Deck, Player, War } from "../src/war";

describe("War Card Game", function () {
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

    describe("Card", function () {
        it("should return a human-readable string representation of itself", function () {
            let card = new Card(CardValue.Three, CardSuit.Spades);

            expect(card.toString()).to.equal("Three of Spades");
        });
    });

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
});