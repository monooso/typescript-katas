import { CardSuit } from './CardSuit';
import { CardValue } from './CardValue';

export class Card {
    /**
     * Constructor.
     *
     * @param {integer} value
     * @param {integer} suit
     */
    public constructor(public readonly value: number, public readonly suit: number) {
    }

    /**
     * Returns a human-readable string representation of the card. For example, 'Jack of Hearts'.
     *
     * @return {string}
     */
    public toString(): string {
        return CardValue[this.value] + ' of ' + CardSuit[this.suit];
    }
}