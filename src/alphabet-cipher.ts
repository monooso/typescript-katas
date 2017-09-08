/**
 * Alphabet Cipher Kata
 * @see https://en.wikipedia.org/wiki/The_Alphabet_Cipher
 */

interface Callback {
    (subject: string, salt: string): string
}

export class Cipher {
    /**
     * Decodes the given string, using the given salt.
     *
     * @param {string} encoded
     * @param {string} salt
     *
     * @return {string}
     */
    public static decode(encoded: string, salt: string): string {
        let map = this.getCipherMap();

        return this.process(encoded, salt, function (character: string, salt: string): string {
            return map.charAt(map.lastIndexOf(character) - map.indexOf(salt));
        });
    }

    /**
     * Encodes the given string, using the given salt.
     *
     * @param {string} unencoded
     * @param {string} salt
     *
     * @return {string}
     */
    public static encode(unencoded: string, salt: string): string {
        let map = this.getCipherMap();

        return this.process(unencoded, salt, function (character: string, salt: string): string {
            return map.charAt(map.indexOf(character) + map.indexOf(salt));
        });
    }

    /**
     * Processes the given subject string and salt, using the given callback function.
     *
     * @param {string} subject
     * @param {string} salt
     * @param {Callback} callback
     *
     * @return {string}
     */
    private static process(subject: string, salt: string, callback: Callback): string {
        let processed = "";

        subject = this.normalizeSubject(subject);
        salt = this.normalizeSalt(salt, subject.length);

        for (let index = 0; index < subject.length; index++) {
            processed += callback(subject.charAt(index), salt.charAt(index));
        }

        return processed;
    }

    /**
     * Normalises the given "subject" string.
     *
     * @param {string} subject
     *
     * @return {string}
     */
    private static normalizeSubject(subject: string): string {
        return this.removeInvalidCharacters(subject);
    }

    /**
     * Ensures that the given salt is the required length.
     *
     * @param {string} salt
     * @param {number} requiredLength
     *
     * @return {string}
     */
    private static normalizeSalt(salt: string, requiredLength: number): string {
        salt = this.removeInvalidCharacters(salt);

        while (salt.length < requiredLength) {
            salt += salt;
        }

        return salt.substr(0, requiredLength);
    }

    /**
     * Removes any invalid characters from the given string.
     *
     * @param {string} input
     *
     * @return {string}
     */
    private static removeInvalidCharacters(input: string): string {
        let regex = new RegExp("[^a-z]");
        return input.replace(regex, "");
    }

    /**
     * Returns the cipher "map".
     *
     * @return {string}
     */
    private static getCipherMap(): string {
        return "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
    }
}