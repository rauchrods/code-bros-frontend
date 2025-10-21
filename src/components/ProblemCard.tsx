import { Link } from "react-router-dom";
import type { Problem } from "../types";
import DifficultyBadge from "../ui/DifficultyBadge";
import "./ProblemCard.scss";

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  return (
    <Link
      key={problem.id}
      to={`/problem/${problem.id}`}
      className="problem-card"
    >
      <div className="problem-header">
        <h3 className="problem-title">{problem.title}</h3>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      <p className="problem-description">
        {problem.description.length > 120
          ? `${problem.description.substring(0, 120)}...`
          : problem.description}
      </p>

      <div className="problem-tags">
        {problem.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="problem-stats">
        <div className="stat">
          <span className="stat-label">Acceptance:</span>
          <span className="stat-value">{parseFloat(problem.acceptance_rate).toFixed(1)}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Submissions:</span>
          <span className="stat-value">{problem.total_submissions.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProblemCard;
