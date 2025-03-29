import { UserInfo } from '../../model/user-info/Userinfo'
import { InvalidParameterException } from '../../model/exception/invalid-parameter-exception/InvalidParameterException'
import type { TableAnalysis } from '../../model/table-analysis/TableAnalysis';

/**
 * Classe para ordenacao mergeSort
 * @see model.TableAnalysis
 */
export class MergeSortAnalysis implements TableAnalysis<UserInfo[]> {

    /**
     * Realiza uma ordenacao mergeSort
     * @param userInfoList Lista de dados a ser analisada
     * @return Lista ordenada
     * @see TableAnalysis
     */
    public analysis(userInfoList: UserInfo[]): UserInfo[] {
        if (userInfoList.length == 0)
            throw new InvalidParameterException("'userInfoList' é vazio")

        return this._mergeSort(userInfoList)
    }

    /**
     * Iniciando mergeSort 
     * @param array Lista a ser ordenada
     * @returns Lista ordenada
     */
    private _mergeSort(array: UserInfo[]): UserInfo[] {
        // Limite da recursividade
        const tamanho: number = array.length
        if (tamanho <= 1) 
            return array
    
        // Obtendo posicao central
        const meio: number = Math.floor(tamanho / 2)

        // Separando vetores
        const vetorEsquerda: UserInfo[] = array.slice(0, meio)
        const vetorDireita: UserInfo[] = array.slice(meio)

        // Aplicando recursividade
        const esquerda: UserInfo[] = this._mergeSort(vetorEsquerda)
        const direita: UserInfo[] = this._mergeSort(vetorDireita)

        // Unificando vetores da esquerda, meio e direita
        return this._merge(esquerda, direita)
    }

    /**
     * Metodo responsvel por unir os vetores
     * @param esquerda Vetor da esquerda
     * @param direita Vetor da direita
     * @returns Lista unificada
     */
    private _merge(esquerda: UserInfo[], direita: UserInfo[]): UserInfo[] {
        // Iniciando variaveis
        let indexEsquerda: number = 0
        let indexDireita: number = 0

        // Calculando limites
        const distanciaEsquerda = esquerda.length
        const distanciaDireita = direita.length

        // Iniciando vetor vazio
        let response: UserInfo[] = []

        // Unificando os vetores da esquerda e da direita
        while (indexEsquerda < distanciaEsquerda && indexDireita < distanciaDireita) {

            // Verificando comparacao
            if (esquerda[indexEsquerda].credit > direita[indexDireita].credit) {
                // Aplicando esquerda
                response.push(esquerda[indexEsquerda])
                indexEsquerda++
            } else {
                // Aplicando direita
                response.push(direita[indexDireita])
                indexDireita++
            }
        }
   
        // Obtendo vetores de resposta
        const vetorEsquerda: UserInfo[] = esquerda.slice(indexEsquerda)
        const vetorDireita: UserInfo[] = direita.slice(indexDireita)
        
        // Retornando resposta
        return response.concat(vetorEsquerda, vetorDireita)
    }
}
