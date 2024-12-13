import { expect, test, describe } from "bun:test";
import { DataReaderException } from "./DataReaderException";

describe("DataReaderException", () => {
    test("1. Devera ser instanciavel corretamente", () => {
        const mock: DataReaderException = new DataReaderException("Error")
        expect(mock).toBeTruthy()
    });

    test("2. Devera ser lancado como erro corretamente", () => {
        const mock: DataReaderException = new DataReaderException("Error")
        expect(() => {throw mock}).toThrowError("Error")
    });

});