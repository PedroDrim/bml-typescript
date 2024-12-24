import type { BunFile } from "bun"
import type { BenchmarkOutput } from "./src/model/benchmark-output/BenchmarkOutput"
import type { TableAnalysis } from "./src/model/table-analysis/TableAnalysis"
import { TimeFormat } from "./src/model/time-format/TimeFormat"
import { UserInfo } from "./src/model/user-info/UserInfo"
import { BenchmarkMeasure } from "./src/provider/benchmark-measure/BenchmarkMeasure"
import { MergeSortAnalysis } from "./src/provider/merge-sort-analysis/MergeSortAnalysis"
import { LanguageSortAnalysis } from "./src/provider/language-sort-analysis/LanguageSortAnalysis"
import { QuickSortAnalysis } from "./src/provider/quick-sort-analysis/QuickSortAnalysis"
import { SummaryAnalysis } from "./src/provider/summary-analysis/SummaryAnalysis"
import { TableReader } from "./src/provider/table-reader/TableReader"

/**
 * Classe de inicio
 */
export class Start {

    /**
     * Arquivo de configuracao
     */
    private _file: BunFile

    /**
     * Construtor publico da classe
     */
    public constructor() {
        const configFile = process.argv[2]
        this._file = Bun.file(configFile)
    }

    /**
     * Metodo responsavel por inicializar as analises
     */
    public async run() {
        // Lendo configuracoes
        const properties = await this._file.json()
        const inputList: string[] = properties.INPUT_FILENAME_LIST
        const output: string = properties.OUTPUT_FILENAME

        let benchmark: BenchmarkOutput = new BenchmarkMeasure()

        // Instanciando analises
        const summaryAnalysis: TableAnalysis<Array<number>> = new SummaryAnalysis()
        const mergeSortAnalysis: TableAnalysis<Array<UserInfo>> = new MergeSortAnalysis()
        const quickSortAnalysis: TableAnalysis<Array<UserInfo>> = new QuickSortAnalysis()
        const languageSortAnalysis: TableAnalysis<Array<UserInfo>> = new LanguageSortAnalysis()

        for(let index = 0; index < inputList.length; index++) {
            const input: string = inputList[index]
            console.log("[START] Arquivo: " + index)

            //==================================================
            // Leitura dos dados
            console.log("\t[LOG] Read")
            benchmark.start("Read@" + index)
            let tableReader: TableReader = new TableReader(input)
            const list: UserInfo[] =  await tableReader.readAll()
            benchmark.end("Read@" + index)
            //==================================================
            // Analise dos dados (Summary)
            console.log("\t[LOG] Summary")
            benchmark.start("SummaryAnalysis@" + index)
            const summary: number[] = summaryAnalysis.analysis(list)
            benchmark.end("SummaryAnalysis@" + index)
            //==================================================
            // Analise dos dados (Merge)
            console.log("\t[LOG] Merge")
            benchmark.start("MergeAnalysis@" + index)
            const merge: UserInfo[] =  mergeSortAnalysis.analysis(list)
            benchmark.end("MergeAnalysis@" + index)
            //==================================================
            // Analise dos dados (Quick)
            console.log("\t[LOG] Quick")
            benchmark.start("QuickAnalysis@" + index)
            const quick: UserInfo[] =  quickSortAnalysis.analysis(list)
            benchmark.end("QuickAnalysis@" + index)
            //==================================================
            // Analise dos dados (Language)
            console.log("\t[LOG] Language")
            benchmark.start("LanguageAnalysis@" + index)
            const lang: UserInfo[] =  languageSortAnalysis.analysis(list)
            benchmark.end("LanguageAnalysis@" + index)
            //==================================================

            console.log("[END] Arquivo: " + index)
        }

        benchmark.export(output, TimeFormat.MILLISEGUNDOS)
    }
}

const start: Start = new Start()
start.run()