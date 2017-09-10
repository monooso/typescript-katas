import { Card } from "./Card";
import { CardSuit } from "./CardSuit";
import { CardValue } from "./CardValue";
import { Stack } from "./Stack";

export class Deck extends Stack {
    /**
     * Constructor. Intialises the deck of cards.
     */
    public constructor() {
        super();
        this.reset();
    }

    /**
     * Removes a card from the top of the deck, and returns it.
     *
     * @return {Card}
     */
    public deal(): Card {
        return this.pop();
    }

    /**
     * Recreates the deck from scratch.
     */
    private reset() {
        let cards: Card[] = [];

        for (const suit in CardSuit) {
            if (isNaN(Number(suit))) {
                continue;
            }

            cards = cards.concat(this.createSuit(Number(suit)));
        }

        this._cards = cards;
    }

    /**
     * Creates the given suit of cards.
     *
     * @param {number} suit
     *
     * @return {Card[]}
     */
    private createSuit(suit: number): Card[] {
        let cards: Card[] = [];

        for (const value in CardValue) {
            if (isNaN(Number(value))) {
                continue;
            }

            cards.push(new Card(Number(value), suit));
        }

        return cards;
    }
}