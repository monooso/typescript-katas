import { Battle } from './Battle';
import { Deck } from './Deck';
import { Player } from './Player';

export class War {
    /**
     * Contructor. Deals the cards in the given deck to the given users.
     *
     * @param {Deck}   deck
     * @param {Player} _one
     * @param {Player} _two
     */
    public constructor(private deck: Deck, private _one: Player, private _two: Player) {
        while (deck.hasCards()) {
            this._one.receiveCard(deck.deal());
            this._two.receiveCard(deck.deal());
        }
    }

    /**
     * Returns the first player.
     *
     * @return {Player}
     */
    public get playerOne(): Player {
        return this._one;
    }

    /**
     * Returns the second player.
     *
     * @return {Player}
     */
    public get playerTwo(): Player {
        return this._two;
    }

    /**
     * Plays a single battle (hand), using the next two cards from the players' decks.
     */
    public battle() {
        let one = this._one.playCard();
        let two = this._two.playCard();

        if (Battle.play(one, two) === one) {
            this._one.receiveCard(one);
            this._one.receiveCard(two);
        } else {
            this._two.receiveCard(one);
            this._two.receiveCard(two);
        }
    }

    /**
     * Returns a boolean indicating whether one of the players has won the war.
     *
     * @return {boolean}
     */
    public isFinished(): boolean {
        return this._one.hand.isEmpty() || this._two.hand.isEmpty();
    }

    /**
     * Returns the winner of the war.
     *
     * @return {Player}
     */
    public getWinner(): Player {
        if (!this.isFinished()) {
            throw new Error('Cannot determine the winner of an unfinished war');
        }
        return this._one.hand.count() > 0 ? this._one : this._two;
    }
}
