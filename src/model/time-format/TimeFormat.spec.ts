import { expect, test, describe } from "bun:test";
import { TimeFormat } from "./TimeFormat";

describe("TimeFormat", () => {
    test("1. 'TimeFormat.SEGUNDOS' devera ser valido", () => {
        expect(TimeFormat.SEGUNDOS).toBeTruthy()
    });

    test("2. 'TimeFormat.MILLISEGUNDOS' devera ser valido", () => {
        expect(TimeFormat.MILLISEGUNDOS).toBeTruthy()
    });

    test("3. 'TimeFormat.NANOSSEGUNDOS' devera ser valido", () => {
        expect(TimeFormat.NANOSSEGUNDOS).toBeTruthy()
    });
});