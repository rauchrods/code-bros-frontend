import React from "react";
import type { Difficulty } from "../types";
import { getDifficultyColor } from "../utils/difficultyColor";
import "./DifficultyBadge.scss";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  return (
    <span
      className="difficulty-badge"
      style={{
        backgroundColor: getDifficultyColor(difficulty),
      }}
    >
      {difficulty}
    </span>
  );
};

export default DifficultyBadge;
