import { expect, test, describe } from "bun:test";
import { UserInfo } from "../../model/user-info/Userinfo";
import { BenchmarkMeasure } from "./BenchmarkMeasure";
import { TimeFormat } from "../../model/time-format/TimeFormat";

describe("BenchmarkMeasure", () => {
    test("1. Devera ser inscanciavel caso possua valor valido", () => {
        expect(new BenchmarkMeasure()).toBeTruthy()
    });

    test("2. 'start()' devera retornar valor valido caso possua parametros validos", () => {
        const mock: BenchmarkMeasure = new BenchmarkMeasure()
        expect(() => {mock.start("test")}).toBeTruthy()
    });

    test("3. 'end()' devera retornar valor valido caso possua parametros validos", () => {
        const mock: BenchmarkMeasure = new BenchmarkMeasure()
        expect(() => {mock.end("test")}).toBeTruthy()
    });

    test("4. 'resultByTag()' devera retornar valor valido caso possua parametros validos", () => {
        const mock: BenchmarkMeasure = new BenchmarkMeasure()
        mock.start("test")
        mock.end("test")
        expect(mock.resultByTag("test", TimeFormat.NANOSSEGUNDOS)).toBeNumber()
    });

    test("5. 'resultByTag()' devera retornar erro caso 'tag' nao exista", () => {
        const mock: BenchmarkMeasure = new BenchmarkMeasure()
        const tag: string = "test1"
        mock.start("test")
        mock.end("test")
        expect(() => {return mock.resultByTag(tag, TimeFormat.NANOSSEGUNDOS)}).toThrowError("Não encontrado par 'inicio-fim' de:" + tag)
    });

    test("6. 'resultByTag()' devera retornar erro caso 'tag' nao possua start", () => {
        const mock: BenchmarkMeasure = new BenchmarkMeasure()
        const tag: string = "test"
        mock.end("test")
        expect(() => {return mock.resultByTag(tag, TimeFormat.NANOSSEGUNDOS)}).toThrowError("Não encontrado par 'inicio-fim' de:" + tag)
    });

    test("7. 'resultByTag()' devera retornar erro caso 'tag' nao possua end", () => {
        const mock: BenchmarkMeasure = new BenchmarkMeasure()
        const tag: string = "test"
        mock.start("test")
        expect(() => {return mock.resultByTag(tag, TimeFormat.NANOSSEGUNDOS)}).toThrowError("Não encontrado par 'inicio-fim' de:" + tag)
    });

    test("8. 'result()' devera ser valido por padrao", () => {
        const mock: BenchmarkMeasure = new BenchmarkMeasure()
        expect(mock.result(TimeFormat.NANOSSEGUNDOS)).toBeTruthy()
    });

    test("9. 'export()' devera ser valido caso possua valores validos", () => {
        const mock: BenchmarkMeasure = new BenchmarkMeasure()
        expect(mock.export("benchmark.json", TimeFormat.NANOSSEGUNDOS)).toBeTruthy()
    });

});
