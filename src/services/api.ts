import type { Language, RunResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get all problems
 */
export const getAllProblems = async () => {
  try {
    const response = await fetch(`${API_URL}/problems`);

    if (!response.ok) {
      throw new Error("Failed to fetch problems");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw error;
  }
};

/**
 * Get problem by ID
 */
export const getProblemById = async (problemId: string) => {
  try {
    const response = await fetch(`${API_URL}/problems/${problemId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch problem");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching problem:", error);
    throw error;
  }
};

/**
 * Run code without validation (for testing/debugging)
 */
export const runCode = async (
  code: string,
  language: Language,
  input?: string
): Promise<RunResponse> => {
  try {
    const response = await fetch(`${API_URL}/code/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language, input: input || "" }),
    });

    if (!response.ok) {
      throw new Error("Failed to run code");
    }

    return response.json();
  } catch (error) {
    console.error("Error running code:", error);
    throw error;
  }
};
