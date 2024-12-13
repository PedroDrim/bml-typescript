import { expect, test, describe } from "bun:test";
import type { DataReader } from "./DataReader";
import type { UserInfo } from "../user-info/UserInfo";

class MockDataReader implements DataReader {
    public async readAll(): Promise<UserInfo[]> {
        return []
    }

    public async read(startIndex: number, endIndex: number): Promise<UserInfo[]> {
        return []
    }
}

describe("DataReader", () => {
    test("1. Integracao com 'DataReader'", () => {
        const mock: DataReader = new MockDataReader()
        expect(mock).toBeTruthy()
    });
});

