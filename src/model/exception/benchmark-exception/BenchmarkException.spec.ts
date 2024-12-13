import { expect, test, describe } from "bun:test";
import { BenchmarkException } from "./BenchmarkException";

describe("BenchmarkException", () => {
    test("1. Devera ser instanciavel corretamente", () => {
        const mock: BenchmarkException = new BenchmarkException("Error")
        expect(mock).toBeTruthy()
    });

    test("2. Devera ser lancado como erro corretamente", () => {
        const mock: BenchmarkException = new BenchmarkException("Error")
        expect(() => {throw mock}).toThrowError("Error")
    });

});