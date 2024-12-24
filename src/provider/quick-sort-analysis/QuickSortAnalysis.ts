import { UserInfo } from '../../model/user-info/UserInfo'
import { InvalidParameterException } from '../../model/exception/invalid-parameter-exception/InvalidParameterException'
import type { TableAnalysis } from '../../model/table-analysis/TableAnalysis'

/**
 * Classe para ordenacao quickSort
 * @see TableAnalysis
 */
export class QuickSortAnalysis implements TableAnalysis<UserInfo[]> {

    private _arrayUserInfo: UserInfo[] = []

    /**
     * Realiza uma analise ordenacao quickSort
     * @param userInfoList Lista de dados a ser analisada
     * @return Elemento aleatorio da lista
     * @see TableAnalysis
     */
    public analysis(userInfoList: UserInfo[]): UserInfo[] {
        if (userInfoList.length == 0)
            throw new InvalidParameterException("'userInfoList' é vazio")

        this._arrayUserInfo = userInfoList

        this._quickSort(0, this._arrayUserInfo.length - 1)

        return this._arrayUserInfo
    }

    /**
     * Iniciando quickSort
     * @param baixo index inicial
     * @param alto index final
     */
    private _quickSort(baixo: number, alto: number): void {
        if (baixo > alto) throw new InvalidParameterException("'baixo' é maior que 'alto'")

        let indexInicio: number = baixo
        let indexFim: number = alto

        // Get the pivot element from the middle of the list
        let index: number = Math.round(baixo + (alto - baixo) / 2)
        let userInfoPivot: UserInfo = this._arrayUserInfo[index]
        let aux: UserInfo

        // Divide into two lists
        while (indexInicio <= indexFim) {
            // If the current value from the left list is smaller than the pivot
            // element then get the next element from the left list
            while (this._arrayUserInfo[indexInicio].credit < userInfoPivot.credit) {
                indexInicio++
            }

            // If the current value from the right list is larger than the pivot
            // element then get the next element from the right list
            while (this._arrayUserInfo[indexFim].credit > userInfoPivot.credit) {
                indexFim--
            }

            // If we have found a value in the left list which is larger than
            // the pivot element and if we have found a value in the right list
            // which is smaller than the pivot element then we exchange the
            // values.
            // As we are done we can increase i and j
            if (indexInicio <= indexFim) {
                aux = this._arrayUserInfo[indexInicio]
                this._arrayUserInfo[indexInicio] = this._arrayUserInfo[indexFim]
                this._arrayUserInfo[indexFim] = aux

                indexInicio++
                indexFim--
            }
        }

        // Recursion
        if (baixo < indexFim) this._quickSort(baixo, indexFim)
        if (indexInicio < alto) this._quickSort(indexInicio, alto)
    }

}
