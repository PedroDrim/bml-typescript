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
        this.userInfoList = this.deserializeFile(fileName)
    }

    /**
     * Metodo privado para conversão do arquivo .csv em uma lista de usuarios
     * @param fileName Nome do arquivo
     * @returns Lista convertida de usuarios 
     */
    private async deserializeFile(fileName: string): Promise<UserInfo[]> {

        let list: UserInfo[] = []
        let first: boolean = true

        const file: BunFile = Bun.file(fileName)
        const lines: string = await file.text()
        lines.split("\n").forEach(line => {

            if (!first && (line.trim() != "")) {
                let values: string[] = line.split(",")

                const user: string = values[0].trim()
                const password: string = values[1].trim()
                const credit: number = Number(values[2].trim())

                let userInfo: UserInfo = new UserInfo(user, password, credit)
                list.push(userInfo)
            } else {
                first = false
            }
        })

        return list
    }
}