/**
 * Returns a boolean indicating whether the given year is a leap year.
 *
 * @param {integer} year
 *
 * @return {boolean}
 */
export function isLeap(year: number): boolean {
    if (!yearIsDivisibleBy4(year)) {
        return false;
    }

    if (yearIsDivisibleBy100(year)) {
        return yearIsDivisibleBy400(year);
    }

    return true;
}

/**
 * Returns a boolean indicating whether the given year is divisible by 4.
 *
 * @param {integer} year
 *
 * @return {boolean}
 */
function yearIsDivisibleBy4(year: number): boolean {
    return (year % 4 === 0);
}

/**
 * Returns a boolean indicating whether the given year is divisible by 100.
 *
 * @param {integer} year
 *
 * @return {boolean}
 */
function yearIsDivisibleBy100(year: number): boolean {
    return (year % 100 === 0);
}

/**
 * Returns a boolean indicating whether the given year is divisible by 400.
 *
 * @param {integer} year
 *
 * @return {boolean}
 */
function yearIsDivisibleBy400(year: number): boolean {
    return (year % 400 === 0);
}