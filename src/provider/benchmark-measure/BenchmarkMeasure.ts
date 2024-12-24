import { DataReaderException } from '../../model/exception/data-reader-exception/DataReaderException'
import { BenchmarkException } from '../../model/exception/benchmark-exception/BenchmarkException'
import { TimeFormat } from '../../model/time-format/TimeFormat';
import type { BenchmarkOutput } from '../../model/benchmark-output/BenchmarkOutput';

/**
 * Classe para captura de estados de tempo
 * @see BenchmarkOutput
 */
export class BenchmarkMeasure implements BenchmarkOutput {

    /**
     * Marca de inicio de estado
     */
    private START_MARK: string = "_S"

    /**
     * Marca de fim de estado
     */
    private END_MARK: string = "_E"

    /**
     * Mapa de estados
     */
    private _benchMap: Map<string, number>  = new Map()

    /**
     * Inicio da captura de estado
     * @param tag Nome da captura referente
     */
    public start(tag: string): void {
        let time: number = new Date().getTime()
        this._benchMap.set(tag + this.START_MARK, time)
    }

    /**
     * Fim da captura de estado
     * @param tag Nome da captura referente
     */
    public end(tag: string): void {
        let time: number = new Date().getTime()
        this._benchMap.set(tag + this.END_MARK, time)
    }

    /**
     * Resultado da captura de estado especifica
     * @param tag Nome da captura referente
     * @param format Formato do resultado
     * @return Tempo decorrido entre o inicio e o fim da captura de estado
     */
    public resultByTag(tag: string, format: TimeFormat): number {
        let startTag: boolean = this._benchMap.has(tag + this.START_MARK)
        let endTag: boolean = this._benchMap.has(tag + this.END_MARK)

        if (!startTag || !endTag) throw new BenchmarkException("Não encontrado par 'inicio-fim' de:" + tag)

        let start: number = this._benchMap.get(tag + this.START_MARK)!
        let end: number = this._benchMap.get(tag + this.END_MARK)!
        return (end - start) * format
    }

    /**
     * Resultado de todas as capturas de estado
     * @param format Formato do resultado
     * @return Mapa contendo o tempo decorrido entre o inicio e o fim da captura de estado para cada estado gerado.
     */
    public result(format: TimeFormat): Map<string, number> {
        var mapResult: Map<string, number> = new Map()

        this._benchMap.forEach((value: number, key: string) => {
            let tag: string = key.split("_")[0]
            let time: number = this.resultByTag(tag, format)
            mapResult.set(tag, time)
        })

        return mapResult
    }

    /**
     * Exporta o resultado no formato de um arquivo
     * @param fileName Nome do arquivo de saida
     * @param format Formato do resultado
     */
    public async export(fileName: string, format: TimeFormat): Promise<void> {
        let mapResult: Map<string, number> = this.result(format)

        let serilizedString: string = "{"
        let size: number = mapResult.size
        let index: number = 1

        mapResult.forEach((value: number, key: string) => {
            serilizedString += "\"" + key + "\":"
            serilizedString += "\"" + value + "\""
            
            if(index < size) {
                serilizedString += ","
                index++
            }
        })

        serilizedString += "}"

        try {
            await Bun.write(fileName, serilizedString)
        } catch (e) {
            throw new DataReaderException("Nao foi possivel escrever arquivo:" + fileName)
        }
    }
}
