import { Table } from './src/model/table/Table'
import { UserInfo } from './src/model/user-info/Userinfo';
import type { SimpleTableAnalysis } from './src/model/simple-table-analysis/SimpleTableAnalysis';
import { MaxValueAnalysis } from './src/provider/max-value-analysis/MaxValueAnalysis';
import { MinValueAnalysis } from './src/provider/min-value-analysis/MinValueAnalysis';
import { MeanAnalysis } from './src/provider/mean-analysis/MeanAnalysis';

/**
 Classe inicial do programa
 */
export class Start {

    /**
     * Arquivo de dados
     */
    private _fileName: string

    /**
     * Metodo de inicializaao do projeto
     * @param args Lista de parametros obtidos via console
     */
    public constructor(args: string[]) {
        // Validando parametros de entrada
        this._fileName = this.getParam(args)
    }

    /**
     * Metodo responsavel por executar as simulacoes
     */
    public async run(): Promise<void> {
        // Obtendo o tempo inicial de leitura em milissegundos
        const leituraAntes: number = new Date().getTime()

        // Convertendo arquivo em lista de "UserInfo"
        const table: Table = new Table(this._fileName)

        // Obtendo lista de usuarios
        const list: UserInfo[] = await table.userInfoList

        // Obtendo o tempo final de leitura em milissegundos
        const leituraDepois: number = new Date().getTime()

        const maxAnalysis: SimpleTableAnalysis = new MaxValueAnalysis()
        const minAnalysis: SimpleTableAnalysis = new MinValueAnalysis()
        const meanAnalysis: SimpleTableAnalysis = new MeanAnalysis()

        // Obtendo o tempo inicial de analise em milissegundos
        const analiseAntes: number = new Date().getTime()

        // Realizando analises
        const max: number = maxAnalysis.analysis(list)
        const min: number = minAnalysis.analysis(list)
        const mean: number = meanAnalysis.analysis(list)

        // Obtendo o tempo final de analise em milissegundos
        const analiseDepois: number = new Date().getTime()

        // Dados de saida
        console.log("[START] Typescript_" + this._fileName)

        let response: string = "[OK]Arquivo: " + this._fileName + "\n"
        response += "[OK]TempoLeitura: " + (leituraDepois - leituraAntes) + " ms \n"
        response += "[OK]TempoAnalise: " + (analiseDepois - analiseAntes) + " ms \n"
        response += "[OK]Max: " + max + "\n"
        response += "[OK]Min: " + min + "\n"
        response += "[OK]Mean: " + mean

        console.log(response)    
        console.log("[END] Typescript_" + this._fileName)
    }

    /**
     * Método para captura e tratamento dos parametros obtidos via console
     * @param codes Lista de parametros obtidos via console
     * @returns Tamanho de usuários á serem gerados
     */
    private getParam(codes: string[]): string {
        if (codes.length != 3) {
            console.log("Parametros inválidos.")
            process.exit(-1)
        }

        return (codes[2])
    }
}

// Iniciando simulacao
const start: Start = new Start(process.argv);
start.run()
