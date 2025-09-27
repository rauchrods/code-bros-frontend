import axios from "axios";
import type { CodeResult, Language } from "../types";
import { languageOptions } from "./languageOptions";

export const runCode = async (
  sourceCode: string,
  languageKey: Language
): Promise<CodeResult | null> => {
  const language_id = languageOptions[languageKey];

  try {
    const { data } = await axios.post<CodeResult>(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: sourceCode,
        language_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key":
            "2028ec7161msh9fa55fb97799b05p11dd3ajsn3f215cf573d7", // Replace with your actual key
        },
      }
    );

    return data;
  } catch (err) {
    console.error("Error running code:", err);
    return null;
  }
};
