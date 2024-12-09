import type { SimpleTableAnalysis } from "../../model/simple-table-analysis/SimpleTableAnalysis"
import type { UserInfo } from "../../model/user-info/UserInfo"

/**
 * Classe de analise que implementa a interface "SimpleTableAnalysis"
 */
export class MinValueAnalysis implements SimpleTableAnalysis {

    /**
     * Metodo de interface, responsavel por realizar obter o valor minimo de credit em uma lista de usuarios
     * @param userInfoList Lista de usuarios
     * @returns Valor minimo de credit 
     */
    public analysis(userInfoList: UserInfo[]): number {

        var min: number = Number.MAX_VALUE
        userInfoList.forEach(userInfo => {
            if (min > userInfo.credit) min = userInfo.credit
        })

        return min
    }
}