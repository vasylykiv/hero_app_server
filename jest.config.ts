import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // дозволяє запускати TS без попередньої компіляції
  testEnvironment: "node", // середовище для бекенду
  verbose: true, // детальний вивід тестів
  testMatch: ["**/**/*.test.ts"], // щоб знаходити файли *.test.ts
};

export default config;
