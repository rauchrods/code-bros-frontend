export type Language = "javascript" | "python" | "java" | "cpp";
export type Theme = "vs-dark" | "vs" | "hc-black";

export interface CodeResult {
  stdout?: string;
  stderr?: string;
  status?: string;
  time?: string;
  memory?: number;
}

export interface LanguageOptions {
  [key: string]: number;
}

export interface Example {
  input: object;
  output: object;
  explanation?: string;
}

export interface StarterCode {
  javascript: string;
  python: string;
  java: string;
  cpp: string;
}

export type Difficulty = "Novice" | "Easy" | "Medium" | "Hard";

export interface Problem {
  id: string;
  title: string;
  description: string;
  examples: Example[];
  constraints: string[];
  hints?: string[];
  difficulty: Difficulty;
  tags: string[];
  starterCode: StarterCode;
  solutionLink: string;
}

export interface RunResponse {
  success: boolean;
  result: CodeResult;
}

export interface TestResult {
  testCase: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  executionTime: number;
  memory: number;
  error: string | null;
}

export interface SubmitResponse {
  success: boolean;
  allPassed: boolean;
  passedCount: number;
  failedCount: number;
  totalTests: number;
  testResults: TestResult[];
  message: string;
}
