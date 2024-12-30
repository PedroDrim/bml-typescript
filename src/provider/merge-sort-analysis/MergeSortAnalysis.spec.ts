import { expect, test, describe } from "bun:test";
import { UserInfo } from "../../model/user-info/UserInfo";
import { MergeSortAnalysis } from "./MergeSortAnalysis";

describe("MergeSortAnalysis", () => {
    test("1. Devera ser inscanciavel caso possua valor valido", () => {
        expect(new MergeSortAnalysis()).toBeTruthy()
    });

    test("2. 'analysis()' devera retornar valor valido caso possua parametros validos", () => {
        const mock: MergeSortAnalysis = new MergeSortAnalysis()
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
        const mock: MergeSortAnalysis = new MergeSortAnalysis()
        expect(() => {return mock.analysis([])}).toThrowError("'userInfoList' é vazio")
    });

});
