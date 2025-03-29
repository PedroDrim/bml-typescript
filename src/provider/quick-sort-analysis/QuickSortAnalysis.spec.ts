import { expect, test, describe } from "bun:test";
import { UserInfo } from "../../model/user-info/Userinfo";
import { QuickSortAnalysis } from "./QuickSortAnalysis";

describe("QuickSortAnalysis", () => {
    test("1. Devera ser inscanciavel caso possua valor valido", () => {
        expect(new QuickSortAnalysis()).toBeTruthy()
    });

    test("2. 'analysis()' devera retornar valor valido caso possua parametros validos", () => {
        const mock: QuickSortAnalysis = new QuickSortAnalysis()
        const listUnordered: UserInfo[] = [
            new UserInfo("u2", "p2", 2),
            new UserInfo("u3", "p3", 3),
            new UserInfo("u1", "p1", 1)
        ]

        const listOrdered: UserInfo[] = [
            new UserInfo("u3", "p3", 3),
            new UserInfo("u2", "p2", 2),
            new UserInfo("u1", "p1", 1)
        ]

        expect(mock.analysis(listUnordered)).toEqual(listOrdered)
    });

    test("3. 'analysis()' devera ser invalido caso o parametro seja vazio", () => {
        const mock: QuickSortAnalysis = new QuickSortAnalysis()
        expect(() => {return mock.analysis([])}).toThrowError("'userInfoList' é vazio")
    });

});
