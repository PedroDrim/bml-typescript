import { UserInfo } from '../../model/user-info/UserInfo'
import { InvalidParameterException } from '../../model/exception/invalid-parameter-exception/InvalidParameterException'
import type { TableAnalysis } from '../../model/table-analysis/TableAnalysis';

/**
 * Classe para ordenacao mergeSort
 * @see model.TableAnalysis
 */
export class MergeSortAnalysis implements TableAnalysis<UserInfo[]> {

    // Vetor auxiliar interno
    private _arrayUserInfo: UserInfo[] = []

    /**
     * Realiza uma ordenacao mergeSort
     * @param userInfoList Lista de dados a ser analisada
     * @return Elemento aleatorio da lista
     * @see TableAnalysis
     */
    public analysis(userInfoList: UserInfo[]): UserInfo[] {
        if (userInfoList.length == 0)
            throw new InvalidParameterException("'userInfoList' é vazio")

        this._arrayUserInfo = userInfoList

        this._mergeSort(0, userInfoList.length - 1)    
        return this._arrayUserInfo
    }

    /**
     * Iniciando mergeSort 
     * @param esquerda Indice da esquerda
     * @param direita Indice da direita
     */
    private _mergeSort(esquerda: number, direita: number): void {
        if (esquerda >= direita) return
    
        // Obtendo posicao central
        const meio = Math.floor(esquerda + (direita - esquerda) / 2)

        // Aplicando recursividade
        this._mergeSort(esquerda, meio)
        this._mergeSort(meio + 1, direita)

        // Unificando vetores da esquerda, meio e direita
        this._merge(esquerda, meio, direita)
    }

    private _merge(esquerda: number, meio: number, right: number): void {
        // Calculando distancia
        const distanciaEsquerda: number = meio - esquerda + 1
        const distanciaDireita: number = right - meio
    
        // Criando vetores temporarios
        const vetorEsquerda: UserInfo[] = new Array(distanciaEsquerda)
        const vetorDireita: UserInfo[] = new Array(distanciaDireita)

        // Variavel de indice
        let index: number = 0
    
        // Copiando dados para o vetor da esquerda
        for (index = 0; index < distanciaEsquerda; index++) {
            vetorEsquerda[index] = this._arrayUserInfo[esquerda + index]
        }

        // Copiando dados para o vetor da direita
        for (index = 0; index < distanciaDireita; index++) {
            vetorDireita[index] = this._arrayUserInfo[meio + 1 + index]
        }
    
        // Iniciando variaveis
        let indexEsquerda: number = 0
        let indexDireita: number = 0
        let initEsquerda: number = esquerda
    
        // Unificando os vetores da esquerda e da direita
        while (indexEsquerda < distanciaEsquerda && indexDireita < distanciaDireita) {

            // Verificando comparacao
            if (vetorEsquerda[indexEsquerda].credit > vetorDireita[indexDireita].credit) {
                // Aplicando esquerda
                this._arrayUserInfo[initEsquerda] = vetorEsquerda[indexEsquerda]
                indexEsquerda++
            } else {
                // Aplicando direita
                this._arrayUserInfo[initEsquerda] = vetorDireita[indexDireita]
                indexDireita++
            }

            initEsquerda++
        }
    
        // Copiando os elementos restantes da esquerda
        while (indexEsquerda < distanciaEsquerda) {
            this._arrayUserInfo[initEsquerda] = vetorEsquerda[indexEsquerda]
            indexEsquerda++
            initEsquerda++
        }
    
        // Copiando os elementos restantes da direita
        while (indexDireita < distanciaDireita) {
            this._arrayUserInfo[initEsquerda] = vetorDireita[indexDireita]
            indexDireita++
            initEsquerda++
        }
    }
}
