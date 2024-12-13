import { expect, test, describe } from "bun:test";
import type { BenchmarkOutput } from "./BenchmarkOutput";
import type { TimeFormat } from "../time-format/TimeFormat";

class MockBenchmarkOutput implements BenchmarkOutput {
    public start(tag: string): void {}

    public end(tag: string): void {}

    public resultByTag(tag: string, format: TimeFormat): number {
        return 0
    }

    public result(format: TimeFormat): Map<string, number> {
        return new Map<string, number>()
    }

    public export(fileName: string, format: TimeFormat): void {}
}

describe("BenchmarkOutput", () => {
    test("1. Integracao com 'BenchmarkOutput'", () => {
        const mock: BenchmarkOutput = new MockBenchmarkOutput()
        expect(mock).toBeTruthy()
    });
});

