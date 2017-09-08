/**
 * Alphabet Cipher Kata
 * @see https://en.wikipedia.org/wiki/The_Alphabet_Cipher
 */

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
        let decoded = "";

        salt = this.normalizeSalt(salt, encoded.length);

        for (let index = 0; index < encoded.length; index++) {
            decoded += this.decodeCharacter(encoded.charAt(index), salt.charAt(index));
        }

        return decoded;
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
     * Decodes a single character, using the given salt.
     *
     * @param {string} encoded
     * @param {string} salt
     *
     * @return {string}
     */
    private static decodeCharacter(encoded: string, salt: string): string {
        let aCharCode = "a".charCodeAt(0);
        let zCharCode = "z".charCodeAt(0);
        let encodedCharCode = encoded.charCodeAt(0);
        let saltCharCode = salt.charCodeAt(0);

        let charCodeOffset = saltCharCode - aCharCode;
        let decodedCharCode = encodedCharCode - charCodeOffset;

        if (decodedCharCode < aCharCode) {
            decodedCharCode = zCharCode - (aCharCode - decodedCharCode - 1);
        }

        return String.fromCharCode(decodedCharCode);
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
        let encoded = "";

        unencoded = this.normalizeUnencoded(unencoded);
        salt = this.normalizeSalt(salt, unencoded.length);

        for (let index = 0; index < unencoded.length; index++) {
            encoded += this.encodeCharacter(unencoded.charAt(index), salt.charAt(index));
        }

        return encoded;
    }

    /**
     * Removes any invalid characters from the given unencoded string.
     *
     * @param {string} raw
     *
     * @return {string}
     */
    private static normalizeUnencoded(raw: string): string {
        return this.removeInvalidCharacters(raw);
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
     * Encodes a single character, using the given salt.
     *
     * @param {string} raw
     * @param {string} salt
     *
     * @return {string}
     */
    private static encodeCharacter(raw: string, salt: string): string {
        let aCharCode = "a".charCodeAt(0);
        let zCharCode = "z".charCodeAt(0);

        let rawCharCode = raw.charCodeAt(0);
        let saltCharCode = salt.charCodeAt(0);

        let newCharCode = rawCharCode + (saltCharCode - aCharCode);

        if (newCharCode > zCharCode) {
            newCharCode = aCharCode + (newCharCode - zCharCode - 1);
        }

        return String.fromCharCode(newCharCode);
    }
}