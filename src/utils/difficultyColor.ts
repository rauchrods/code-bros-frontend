import type { Difficulty } from "../types";

export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case "Novice":
      return "#8e38ffff";
    case "Easy":
      return "#00b894";
    case "Medium":
      return "#fdb631ff";
    case "Hard":
      return "#e17055";
    default:
      return "#cccccc";
  }
};
