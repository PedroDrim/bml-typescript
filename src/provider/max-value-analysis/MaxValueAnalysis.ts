import type { SimpleTableAnalysis } from "../../model/simple-table-analysis/SimpleTableAnalysis";
import type { UserInfo } from "../../model/user-info/UserInfo";

/**
 * Classe de analise que implementa a interface "SimpleTableAnalysis"
 */
export class MaxValueAnalysis implements SimpleTableAnalysis {
   
    /**
     * Método de interface, responsável por realizar obter o valor maximo de credit em uma lista de usuarios
     * @param userInfoList Lista de usuarios
     * @returns Valor maximo de credit 
     */
    public analysis(userInfoList: UserInfo[]): number{

        let max: number = Number.MIN_VALUE;
        userInfoList.forEach(userInfo => {
            if(max < userInfo.credit) max = userInfo.credit
        })

        return max
    }
}