import { expect, test, describe } from "bun:test";
import { TableReader } from "./TableReader";

describe("TableReader", () => {
    test("1. Devera ser inscanciavel caso possua valor valido", () => {
        expect(new TableReader("./data/test.csv")).toBeTruthy()
    });

    test("2. 'readAll()' devera retornar valor valido", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(mock.readAll()).toBeTruthy()
    });

    test("3. 'read()' devera retornar valor valido caso possua valores validos", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(1,2)}).toBeTruthy()
    });

    test("4. 'read()' devera ser invalido caso 'start' seja negativo", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(-1,2)}).toThrowError("'startIndex' é menor que 0")
    });

    test("5. 'read()' devera ser invalido caso 'end' seja negativo", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(1,-2)}).toThrowError("'endIndex' é menor que 0")
    });

    test("6. 'read()' devera ser invalido caso 'end' seja menor que 'start'", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(2,1)}).toThrowError("'startIndex' é maior ou igual á 'endIndex'")
    });

    test("7. 'read()' devera ser invalido caso 'end' seja igual a 'start'", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(2,2)}).toThrowError("'startIndex' é maior ou igual á 'endIndex'")
    });
});
