export const enum CardSuit {
    Spade,
    Club,
    Diamond,
    Heart
}

export const enum CardValue {
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

export class Card {
    constructor(public readonly value: CardValue, public readonly suit: CardSuit) {
    }
}

export class Battle {
    public static play(playerOne: Card, playerTwo: Card): Card {
        if (playerOne.value === playerTwo.value) {
            return playerOne.suit > playerTwo.suit ? playerOne : playerTwo;
        } else {
            return playerOne.value > playerTwo.value ? playerOne : playerTwo;
        }
    }
}