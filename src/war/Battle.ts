import { Card } from "./Card";

export class Battle {
    /**
     * "Battles" the given cards, and returns the winner.
     *
     * @param {Card} one
     * @param {Card} two
     *
     * @return {Card}
     */
    public static play(one: Card, two: Card): Card {
        if (one.value === two.value) {
            return one.suit > two.suit ? one : two;
        } else {
            return one.value > two.value ? one : two;
        }
    }
}