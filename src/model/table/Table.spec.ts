import { expect, test, describe } from "bun:test";
import { Table } from "./Table";

describe("Table", () => {
    test("1. Devera ser inscanciavel caso possua valor valido", () => {
        expect(new Table("./data/test.csv")).toBeTruthy()
    });

    test("2. 'userInfoList' devera retornar valor corretamente", () => {
        const mock: Table = new Table("./data/test.csv")
        expect(mock.userInfoList).toBeTruthy()
    });
});

