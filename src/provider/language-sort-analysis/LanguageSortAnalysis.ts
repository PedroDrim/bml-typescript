import { UserInfo } from '../../model/user-info/UserInfo'
import { InvalidParameterException } from '../../model/exception/invalid-parameter-exception/InvalidParameterException'
import type { TableAnalysis } from '../../model/table-analysis/TableAnalysis';

/**
 * Classe para analise de dados, obtem um usuario aleatoriamente
 * @see TableAnalysis
 */
export class LanguageSortAnalysis implements TableAnalysis<UserInfo[]> {

    /**
     * Realiza uma analise aleatoria dos dados
     * @param userInfoList Lista de dados a ser analisada
     * @return Elemento aleatorio da lista
     * @see TableAnalysis
     */
    public analysis(userInfoList: UserInfo[]): UserInfo[] {
        if (userInfoList.length == 0)
            throw new InvalidParameterException("'userInfoList' é vazio")

        return userInfoList.sort((u1, u2) => u1.credit > u2.credit ? 1 : -1)
    }
}
