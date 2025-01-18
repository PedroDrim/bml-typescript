import { UserInfo } from '../../model/user-info/Userinfo'
import { InvalidParameterException } from '../../model/exception/invalid-parameter-exception/InvalidParameterException'
import type { TableAnalysis } from '../../model/table-analysis/TableAnalysis'

/**
 * Classe para ordenacao quickSort
 * @see TableAnalysis
 */
export class QuickSortAnalysis implements TableAnalysis<UserInfo[]> {

    /**
     * Realiza uma analise ordenacao quickSort
     * @param userInfoList Lista de dados a ser analisada
     * @return Lista ordenada
     * @see TableAnalysis
     */
    public analysis(userInfoList: UserInfo[]): UserInfo[] {
        if (userInfoList.length == 0)
            throw new InvalidParameterException("'userInfoList' é vazio")

        return this._quickSort(userInfoList)
    }

    /**
     * Iniciando quickSort
     * @param array Lista a ser ordenada
     * @returns Lista ordenada
     */
    private _quickSort(array: UserInfo[]): UserInfo[] {
        const tamanho: number = array.length
        if (tamanho <= 1)
            return array

        // Obtendo posicao central
        const meio: number = Math.floor(tamanho / 2)
        const pivot: UserInfo = array[meio]

        // Separando vetores
        const menores: UserInfo[] = array.filter((value: UserInfo) => value.credit < pivot.credit)
        const iguais: UserInfo[] = array.filter((value: UserInfo) => value.credit == pivot.credit)
        const maiores: UserInfo[] = array.filter((value: UserInfo) => value.credit > pivot.credit)

        // Obtendo vetores
        const arrayMenores: UserInfo[] = this._quickSort(menores)
        const arrayMaiores: UserInfo[] = this._quickSort(maiores)

        // Retornando vetor
        return [...arrayMaiores, ...iguais, ...arrayMenores]
    }

}
