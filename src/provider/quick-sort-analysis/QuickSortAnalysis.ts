import { UserInfo } from '../../model/user-info/UserInfo'
import { InvalidParameterException } from '../../model/exception/invalid-parameter-exception/InvalidParameterException'
import type { TableAnalysis } from '../../model/table-analysis/TableAnalysis'

/**
 * Classe para ordenacao quickSort
 * @see TableAnalysis
 */
export class QuickSortAnalysis implements TableAnalysis<UserInfo[]> {

    // Vetor auxiliar interno
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

        // Obtem os indices de inicio e fim
        let indexInicio: number = baixo
        let indexFim: number = alto

        // Calcula o pivot central
        const index: number = Math.round(baixo + (alto - baixo) / 2)
        const userInfoPivot: UserInfo = this._arrayUserInfo[index]

        // Gerando variavel de troca
        let aux: UserInfo

        // Calculando troca de posicao
        while (indexInicio <= indexFim) {
            // Verificando valores que sao maiores que o pivot para mover o limite minimo
            while (this._arrayUserInfo[indexInicio].credit > userInfoPivot.credit) {
                indexInicio++
            }

            // Verificando valores que sao menores que o pivot para mover o limite maximo
            while (this._arrayUserInfo[indexFim].credit < userInfoPivot.credit) {
                indexFim--
            }

            // Aplicando troca de valores
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
