import { Table } from './src/model/table/Table'
import { UserInfo } from './src/model/user-info/UserInfo';
import type { SimpleTableAnalysis } from './src/model/simple-table-analysis/SimpleTableAnalysis';
import { MaxValueAnalysis } from './src/provider/max-value-analysis/MaxValueAnalysis';
import { MinValueAnalysis } from './src/provider/min-value-analysis/MinValueAnalysis';
import { MeanAnalysis } from './src/provider/mean-analysis/MeanAnalysis';

/**
 Classe inicial do programa
 */
export class Start {

    /**
     * Metodo de inicializaao do projeto
     * @param args Lista de parametros obtidos via console
     */
    public constructor(args: string[]) {
        // Validando parametros de entrada
        let fileName: string = this.getParam(args)

        // Obtendo o tempo inicial de leitura em milissegundos
        const leituraAntes: number = new Date().getTime()

        // Convertendo arquivo em lista de "UserInfo"
        const table: Table = new Table(fileName)

        // Obtendo o tempo final de leitura em milissegundos
        const leituraDepois: number = new Date().getTime()

        table.userInfoList.then((list: UserInfo[]) => {
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
            let response: string = "[OK]{arquivo: " + fileName +
                ", tempoLeitura: " + (leituraDepois - leituraAntes) + ", tempoAnalise: " + (analiseDepois - analiseAntes) +
                ", max: " + max + ", min: " + min + ", mean: " + mean + "}"
    
            console.log(response)    
        })
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
new Start(process.argv);
