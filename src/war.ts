export enum CardSuit {
    Spades,
    Clubs,
    Diamonds,
    Hearts
}

export enum CardValue {
    Two = 2,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace
}

class Stack {
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
        return this._cards.pop();
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
        return this._cards.shift();
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

export class Card {
    public constructor(public readonly value: number, public readonly suit: number) {
    }

    /**
     * Returns a human-readable string representation of the card. For example, "Jack of Hearts".
     *
     * @return {string}
     */
    public toString(): string {
        return CardValue[this.value] + ' of ' + CardSuit[this.suit];
    }
}

export class Deck extends Stack {
    public constructor() {
        super();
        this.reset();
    }

    public deal(): Card {
        return this.pop();
    }

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

export class War {
    public constructor(private deck: Deck, private _one: Player, private _two: Player) {
        while (deck.hasCards()) {
            this._one.receiveCard(deck.deal());
            this._two.receiveCard(deck.deal());
        }
    }

    public get playerOne(): Player {
        return this._one;
    }

    public get playerTwo(): Player {
        return this._two;
    }

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

    public isFinished(): boolean {
        return this._one.hand.isEmpty() || this._two.hand.isEmpty();
    }

    public getWinner(): Player {
        if (!this.isFinished()) {
            throw new Error("Cannot determine the winner of an unfinished war");
        }
        return this._one.hand.count() > 0 ? this._one : this._two;
    }
}

export class Battle {
    public static play(one: Card, two: Card): Card {
        if (one.value === two.value) {
            return one.suit > two.suit ? one : two;
        } else {
            return one.value > two.value ? one : two;
        }
    }
}