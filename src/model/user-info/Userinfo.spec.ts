import { expect, test, describe } from "bun:test";
import { UserInfo } from "./Userinfo";

describe("UserInfo", () => {
    test("1. Devera ser instanciavel corretamente", () => {
        const userinfo: UserInfo = new UserInfo("user", "password", 0)
        expect(userinfo).toBeTruthy()
    });

    test("2. 'username' devera ser alteravel", () => {
        let userinfo: UserInfo = new UserInfo("user", "password", 0)
        expect(() => { userinfo.user = "newUser" }).toBeTruthy()
    });

    test("3. 'credit' devera ser alteravel", () => {
        let userinfo: UserInfo = new UserInfo("user", "password", 0)
        expect(() => { userinfo.credit = 10 }).toBeTruthy()
    });

    test("4. Metodo 'setPassword()' devera ser executado corretamente", () => {
        let userinfo: UserInfo = new UserInfo("user", "password", 0)
        expect(() => { userinfo.setPassword("newPassword") }).toBeTruthy()
    });

    test("5. 'username' devera ser obtido corretamente", () => {
        const variable: string = "user"
        let userinfo: UserInfo = new UserInfo(variable, "password", 0)
        expect(userinfo.user).toEqual(variable)
    });

    test("6. 'credit' devera ser obtido corretamente", () => {
        const variable: number = 10
        let userinfo: UserInfo = new UserInfo("user", "password", variable)
        expect(userinfo.credit).toEqual(variable)
    });

    test("7. Metodo 'getPassword()' devera ser executado corretamente", () => {
        let userinfo: UserInfo = new UserInfo("user", "password", 0)
        expect(userinfo.getPassword()).toBeTruthy()
    });
});