import type { Language, RunResponse, SubmitResponse } from "../types";

const API_URL =
  import.meta.env.VITE_APP_ENV === "production"
    ? import.meta.env.VITE_API_PROD_URL
    : import.meta.env.VITE_API_DEV_URL;

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
export const getProblemById = async (problemId: string | undefined) => {
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

/**
 * Submit code for validation against all test cases
 */
export const submitCode = async (
  code: string,
  language: Language,
  problemId: string
): Promise<SubmitResponse> => {
  try {
    const response = await fetch(`${API_URL}/code/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language, problemId }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit code");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting code:", error);
    throw error;
  }
};
