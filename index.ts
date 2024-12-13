import type { BunFile } from "bun"
import type { BenchmarkOutput } from "./src/model/benchmark-output/BenchmarkOutput"
import type { TableAnalysis } from "./src/model/table-analysis/TableAnalysis"
import { TimeFormat } from "./src/model/time-format/TimeFormat"
import { UserInfo } from "./src/model/user-info/UserInfo"
import { BenchmarkMeasure } from "./src/provider/benchmark-measure/BenchmarkMeasure"
import { BubbleSortAnalysis } from "./src/provider/bubble-sort-analysis/BubbleSortAnalysis"
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
        const input: string = properties.INPUT_FILENAME
        const output: string = properties.OUTPUT_FILENAME

        let benchmark: BenchmarkOutput = new BenchmarkMeasure()

        // Instanciando analises
        let summaryAnalysis: TableAnalysis<Array<number>> = new SummaryAnalysis()
        let bubbleSortAnalysis: TableAnalysis<Array<UserInfo>> = new BubbleSortAnalysis()
        let quickSortAnalysis: TableAnalysis<Array<UserInfo>> = new QuickSortAnalysis()
        let languageSortAnalysis: TableAnalysis<Array<UserInfo>> = new LanguageSortAnalysis()

        //==================================================
        // Leitura dos dados
        benchmark.start("Read")
        let tableReader: TableReader = new TableReader(input)
        const list: UserInfo[] =  await tableReader.readAll()
        benchmark.end("Read")
        //==================================================
        // Analise dos dados (Summary)
        benchmark.start("SummaryAnalyse")
        let summary: number[] = summaryAnalysis.analysis(list)
        benchmark.end("SummaryAnalyse")
        //==================================================
        // Analise dos dados (Bubble)
        benchmark.start("BubbleAnalyse")
        let bubble: UserInfo[] =  bubbleSortAnalysis.analysis(list)
        benchmark.end("BubbleAnalyse")
        //==================================================
        // Analise dos dados (Quick)
        benchmark.start("QuickAnalyse")
        let quick: UserInfo[] =  quickSortAnalysis.analysis(list)
        benchmark.end("QuickAnalyse")
        //==================================================
        // Analise dos dados (Language)
        benchmark.start("LanguageAnalyse")
        let lang: UserInfo[] =  languageSortAnalysis.analysis(list)
        benchmark.end("LanguageAnalyse")        
        //==================================================

        benchmark.export(output, TimeFormat.MILLISEGUNDOS)
    }
}

const start: Start = new Start()
start.run()