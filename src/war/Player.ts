import { Card } from "./Card";
import { Stack } from "./Stack";

export class Player {
    private _hand: Stack;

    /**
     * Constructor. Sets the player's name, and initialises the hand.
     *
     * @param {string} name
     */
    constructor(public name: string) {
        this._hand = new Stack;
    }

    /**
     * Returns the player's stack of cards.
     *
     * @return {Stack}
     */
    public get hand(): Stack {
        return this._hand;
    }

    /**
     * Removes a card from the top of the player's hand, and returns it.
     *
     * @return {Card}
     */
    public playCard(): Card {
        return this._hand.pop();
    }

    /**
     * Adds the given card to the *bottom* of the player's hand.
     *
     * @param {Card} card
     */
    public receiveCard(card: Card) {
        this._hand.unshift(card);
    }
}