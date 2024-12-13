import type { BunFile } from "bun";
import { UserInfo } from "../user-info/UserInfo";

/**
 * Classe para gerenciar uma tabela de usuarios
 */
export class Table {

    // Variavel privada da lista de usuarios
    readonly userInfoList: Promise<UserInfo[]>

    /**
     * Construtor publico da classe
     * @param fileName Nome do arquivo .csv
     */
    constructor(fileName: string) {
        this.userInfoList = this._deserializeFile(fileName)
    }

    /**
     * Metodo privado para conversão do arquivo .csv em uma lista de usuarios
     * @param fileName Nome do arquivo
     * @returns Lista convertida de usuarios 
     */
    private async _deserializeFile(fileName: string): Promise<UserInfo[]> {
        const file: BunFile = Bun.file(fileName)
        const fullFile: string = await file.text()
        const lines: string[] = fullFile.split("\n")

        const list: UserInfo[] = lines.filter((line: string) => line != "").map(this._convertToUserInfo)
        return list
    }

    /**
     * Metodo privado para converter linha em usuario
     * @param line Linha a ser convertida
     * @returns Usuario existente da linha
     */
    private _convertToUserInfo(line: string): UserInfo {
        let values: string[] = line.split(",")

        const user: string = values[0].trim()
        const password: string = values[1].trim()
        const credit: number = Number(values[2].trim())

        const userInfo: UserInfo = new UserInfo(user, password, credit)
        return userInfo
    } 
}