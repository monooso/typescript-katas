import { expect } from "chai";
import "mocha";

import { Cipher } from "../src/alphabet-cipher";

describe("Alphabet Cipher", function () {
    it("encodes a single character", function () {
        let raw = "a";
        let salt = "d";
        let encoded = "d";

        expect(Cipher.encode(raw, salt)).to.equal(encoded);
    });

    it("encodes a word", function () {
        let input = "hello";
        let salt = "world";
        let output = "dscwr";

        expect(Cipher.encode(input, salt)).to.equal(output);
    });

    it("ignores invalid characters when encoding", function () {
        let input = "hello hello";
        let salt = "world";
        let output = "dscwrdscwr";

        expect(Cipher.encode(input, salt)).to.equal(output);
    });

    it("ignores invalid salt characters when encoding", function () {
        let input = "hellohello";
        let salt = "world world";
        let output = "dscwrdscwr";

        expect(Cipher.encode(input, salt)).to.equal(output);
    });

    it("repeats the encoding salt, if required", function () {
        let input = "hellohello";
        let salt = "world";
        let output = "dscwrdscwr";

        expect(Cipher.encode(input, salt)).to.equal(output);
    });

    it("ignores extraneous encoding salt characters", function () {
        let input = "hello";
        let salt = "worldinmotion";
        let output = "dscwr";

        expect(Cipher.encode(input, salt)).to.equal(output);
    });

    it("decodes a single character", function () {
        let encoded = "d";
        let salt = "b";
        let decoded = "c";

        expect(Cipher.decode(encoded, salt)).to.equal(decoded);
    });

    it("decodes a word", function () {
        let encoded = "dscwr";
        let decoded = "hello";
        let salt = "world";

        expect(Cipher.decode(encoded, salt)).to.equal(decoded);
    });

    it("repeats the decoding salt, if required", function () {
        let encoded = "dscwrdscwr";
        let decoded = "hellohello";
        let salt = "world";

        expect(Cipher.decode(encoded, salt)).to.equal(decoded);
    });

    it("ignores extraneous decoding salt characters", function () {
        let encoded = "dscwr";
        let decoded = "hello";
        let salt = "worldinmotion";

        expect(Cipher.decode(encoded, salt)).to.equal(decoded);
    });

    it("ignores invalid salt characters when decoding", function () {
        let encoded = "dscwrdscwr";
        let decoded = "hellohello";
        let salt = "world world";

        expect(Cipher.decode(encoded, salt)).to.equal(decoded);
    });
});