import { expect, test, describe } from "bun:test";
import type { TableAnalysis } from "./TableAnalysis";
import type { UserInfo } from "../user-info/Userinfo";

class MockTableAnalysis implements TableAnalysis<number> {
    public analysis(userInfoList: UserInfo[]): number {
        return 0
    }
}

describe("TableAnalysis", () => {
    test("1. Integracao com 'TableAnalysis'", () => {
        const mock: TableAnalysis<number> = new MockTableAnalysis()
        expect(mock).toBeTruthy()
    });
});

