import type { Difficulty } from "../types";

export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case "Easy":
      return "#00b894";
    case "Medium":
      return "#fdcb6e";
    case "Hard":
      return "#e17055";
    default:
      return "#cccccc";
  }
};
