import { UserInfo } from '../../model/user-info/UserInfo'
import { InvalidParameterException } from '../../model/exception/invalid-parameter-exception/InvalidParameterException'
import type { TableAnalysis } from '../../model/table-analysis/TableAnalysis';

/**
 * Classe para ordenacao mergeSort
 * @see model.TableAnalysis
 */
export class MergeSortAnalysis implements TableAnalysis<UserInfo[]> {

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

    private _mergeSort(left: number, right: number) {
        if (left >= right) return
    
        const mid = Math.floor(left + (right - left) / 2)
        this._mergeSort(left, mid)
        this._mergeSort(mid + 1, right)
        this._merge(left, mid, right)
    }

    private _merge(left: number, mid: number, right: number) {
        const n1: number = mid - left + 1
        const n2: number = right - mid
    
        // Create temp arrays
        const L: UserInfo[] = new Array(n1)
        const R: UserInfo[] = new Array(n2)
    
        // Copy data to temp arrays L[] and R[]
        for (let i = 0; i < n1; i++) {
            L[i] = this._arrayUserInfo[left + i]
        }

        for (let j = 0; j < n2; j++) {
            R[j] = this._arrayUserInfo[mid + 1 + j]
        }
    
        let i: number = 0
        let j: number = 0
        let k: number = left
    
        // Merge the temp arrays back into arr[left..right]
        while (i < n1 && j < n2) {
            if (L[i].credit <= R[j].credit) {
                this._arrayUserInfo[k] = L[i]
                i++
            } else {
                this._arrayUserInfo[k] = R[j]
                j++
            }

            k++
        }
    
        // Copy the remaining elements of L[], if there are any
        while (i < n1) {
            this._arrayUserInfo[k] = L[i]
            i++
            k++
        }
    
        // Copy the remaining elements of R[], if there are any
        while (j < n2) {
            this._arrayUserInfo[k] = R[j]
            j++
            k++
        }
    }
}
