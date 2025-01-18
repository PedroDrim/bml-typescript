import { InvalidParameterException } from '../../model/exception/invalid-parameter-exception/InvalidParameterException'
import type { TableAnalysis } from '../../model/table-analysis/TableAnalysis'
import { UserInfo } from '../../model/user-info/Userinfo'

/**
 * Classe para analise de dados, obtem os valores maximo e minimo dos creditos dos usuarios
 * @see TableAnalysis
 */
export class SummaryAnalysis implements TableAnalysis<number[]> {

    /**
     * Realiza a analise maxima e minima dos dados
     * @param userInfoList Lista de dados a ser analisada
     * @return Valores maximo e minimo dos creditos
     * @see TableAnalysis
     */
    public analysis(userInfoList: UserInfo[]): number[] {
        if (userInfoList.length == 0)
            throw new InvalidParameterException("'userInfoList' é vazio")

        let max: number = Number.MIN_VALUE
        let min: number = Number.MAX_VALUE
        let sum: number = 0

        const response: number[] = userInfoList.reduce((accumulated: number[], next: UserInfo) => {
            const credit: number = next.credit
            accumulated[2] += credit
            if (accumulated[1] < credit) accumulated[1] = credit
            if (accumulated[0] > credit) accumulated[0] = credit
            return accumulated
        }, [min, max, sum])

        response[2] /= userInfoList.length
        return response
    }
}

