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
  input: string;
  output: string;
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
}

export interface RunResponse {
  success: boolean;
  result: CodeResult;
}
