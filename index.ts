import { UserInfo } from "./src/model/userinfo/UserInfo"

/**
 Classe inicial do programa
 */
export class Start {

    /**
     * Metodo de inicializaao do projeto
     * @param args Lista de parametros obtidos via console
     */
    constructor(param: String[]) {
        // Iniciando timer
        const antes: number = new Date().getTime()
        let tamanho: number = this.prepareArgs(param)

        // Validando tamanho de entradas
        if (tamanho != -1) {
            let list: UserInfo[] = []

            // Criando UserInfo
            for (let index: number = 0; index < tamanho; index++) {
                const user: string = "user" + index
                const password: string = "password" + index
                list.push(new UserInfo(user, password))
            }

            // Calculando benchmark
            const time: number = new Date().getTime() - antes

            // Escrevendo Json
            const response: string = "[OK]{tamanho: " + tamanho + ", tempo: " + time + "}"
            console.log(response)
        }
    }

    /**
     * Metodo para captura e tratamento dos parametros obtidos via console
     * @param codes Lista de parametros obtidos via console
     * @return Tamanho de usuarios a serem gerados
     */
    private prepareArgs(codes: String[]): number {
        // Verificando tamanho de argumentos
        if (codes.length != 3) {
            console.log("Parametros invalidos.")
            return -1
        }

        // Obtendo numero de linhas
        const line: number = Number(codes[2])

        // Validando tamanho de linhas
        if (line <= 0) {
            console.log("Quantidade de linhas menor que 1.")
            return -1
        }

        return line
    }
}

// Iniciando simulacao
new Start(process.argv)