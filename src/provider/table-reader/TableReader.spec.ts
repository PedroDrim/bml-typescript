import { expect, test, describe } from "bun:test";
import { TableReader } from "./TableReader";

describe("TableReader", () => {
    test("1. Devera ser instanciavel caso possua valor valido", () => {
        expect(new TableReader("./data/test.csv")).toBeTruthy()
    });

    test("2. 'open()' devera retornar valor valido caso arquivo seja valido", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(async () => {await mock.open()}).toBeTruthy()
    });

    test("3. 'open()' devera retornar excessao caso arquivo seja invalido", () => {
        const mock: TableReader = new TableReader("./data/fake.csv")
        expect(async () => {await mock.open()}).toThrowError("Erro ao ler arquivo:./data/fake.csv")
    });

    test("4. 'readAll()' devera retornar valor valido", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(mock.readAll()).toBeTruthy()
    });

    test("5. 'read()' devera retornar valor valido caso possua valores validos", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(1,2)}).toBeTruthy()
    });

    test("6. 'read()' devera ser invalido caso 'start' seja negativo", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(-1,2)}).toThrowError("'startIndex' é menor que 0")
    });

    test("7. 'read()' devera ser invalido caso 'end' seja negativo", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(1,-2)}).toThrowError("'endIndex' é menor que 0")
    });

    test("8. 'read()' devera ser invalido caso 'end' seja menor que 'start'", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(2,1)}).toThrowError("'startIndex' é maior ou igual á 'endIndex'")
    });

    test("9. 'read()' devera ser invalido caso 'end' seja igual a 'start'", () => {
        const mock: TableReader = new TableReader("./data/test.csv")
        expect(() => {return mock.read(2,2)}).toThrowError("'startIndex' é maior ou igual á 'endIndex'")
    });
});
