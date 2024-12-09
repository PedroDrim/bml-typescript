import type { SimpleTableAnalysis } from "../../model/simple-table-analysis/SimpleTableAnalysis"
import type { UserInfo } from "../../model/user-info/UserInfo"

/**
 * Classe de analise que implementa a interface "SimpleTableAnalysis"
 */
export class MeanAnalysis implements SimpleTableAnalysis {
    
    /**
     * Metodo de interface, responsavel por realizar obter a media dos valores de credit em uma lista de usuarios
     * @param userInfoList Lista de usuarios
     * @returns Media dos valores de credit 
     */
    public analysis(userInfoList: UserInfo[]): number{

        let sum: number = 0.0
        userInfoList.forEach(userInfo => sum += userInfo.credit )

        return sum/(userInfoList.length)
    }
}