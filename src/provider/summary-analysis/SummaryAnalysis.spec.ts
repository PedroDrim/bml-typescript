import { expect, test, describe } from "bun:test";
import { SummaryAnalysis } from "./SummaryAnalysis";
import { UserInfo } from "../../model/user-info/Userinfo";

describe("SummaryAnalysis", () => {
    test("1. Devera ser inscanciavel caso possua valor valido", () => {
        expect(new SummaryAnalysis()).toBeTruthy()
    });

    test("2. 'analysis()' devera retornar valor valido caso possua parametros validos", () => {
        const mock: SummaryAnalysis = new SummaryAnalysis()
        const list: UserInfo[] = [
            new UserInfo("u1", "p1", 1),
            new UserInfo("u2", "p2", 2),
            new UserInfo("u3", "p3", 3)
        ]

        expect(mock.analysis(list)).toEqual([1, 3, 2])
    });

    test("3. 'analysis()' devera ser invalido caso o parametro seja vazio", () => {
        const mock: SummaryAnalysis = new SummaryAnalysis()
        expect(() => {return mock.analysis([])}).toThrowError("'userInfoList' é vazio")
    });

});
