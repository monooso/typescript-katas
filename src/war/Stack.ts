import { Card } from "./Card";

export class Stack {
    protected _cards: Card[] = [];

    /**
     * Returns the stack of cards.
     *
     * @return {Card[]}
     */
    public get cards(): Card[] {
        return this._cards;
    }

    /**
     * Returns the number of cards in the deck.
     *
     * @return {integer}
     */
    public count(): number {
        return this._cards.length;
    }

    /**
     * Returns a boolean indicating whether the stack contains any cards.
     *
     * @return {boolean}
     */
    public hasCards(): boolean {
        return this.count() > 0;
    }

    /**
     * Returns a boolean indicating whether the stack is empty.
     *
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return this.count() <= 0;
    }

    /**
     * Removes a card from the top of the stack, and returns it.
     *
     * @return {Card}
     */
    public pop(): Card {
        this.validateCount();
        return (this._cards.pop() as Card);
    }

    /**
     * Adds the given card to the top of the stack.
     *
     * @param {Card} card
     */
    public push(card: Card) {
        this._cards.push(card);
    }

    /**
     * Removes a card from the bottom of the stack, and returns it.
     *
     * @return {Card}
     */
    public shift(): Card {
        this.validateCount();
        return (this._cards.shift() as Card);
    }

    /**
     * Adds the given card to the bottom of the stack.
     *
     * @param {Card} card
     */
    public unshift(card: Card) {
        this._cards.unshift(card);
    }

    /**
     * Randomises the stack of cards, using the Durstenfeld implementation of the
     * Fisher-Yates algorithm.
     *
     * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
     */
    public shuffle() {
        let cards = this._cards;

        for (let i = cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let card = cards[i];

            cards[i] = cards[j];
            cards[j] = card;
        }

        this._cards = cards;
    }

    /**
     * Returns a human readable comma-delimited list of the cards in the stack.
     * For example: "Jack of Spades, Three of Diamonds".
     *
     * @return {string}
     */
    public toString(): string {
        let signature: string[] = [];

        this._cards.forEach(function (card: Card) {
            signature.push(card.toString());
        });

        return signature.join(", ");
    }

    /**
     * Validates that the stack is not empty. Throws an error if it is.
     *
     * @throws {Error}
     */
    protected validateCount() {
        if (this.isEmpty()) {
            throw new Error("Cannot retrieve a card from an empty stack");
        }
    }
}