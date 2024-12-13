import { expect, test, describe } from "bun:test";
import { InvalidParameterException } from "./InvalidParameterException";

describe("InvalidParameterException", () => {
    test("1. Devera ser instanciavel corretamente", () => {
        const mock: InvalidParameterException = new InvalidParameterException("Error")
        expect(mock).toBeTruthy()
    });

    test("2. Devera ser lancado como erro corretamente", () => {
        const mock: InvalidParameterException = new InvalidParameterException("Error")
        expect(() => {throw mock}).toThrowError("Error")
    });

});