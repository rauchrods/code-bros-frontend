import type { Problem } from "../types";
import { getDifficultyColor } from "../utils/difficultyColor";
import "./ProblemStatement.scss";

interface ProblemStatementProps {
  problem: Problem | undefined;
}

const ProblemStatement: React.FC<ProblemStatementProps> = ({ problem }) => {
  if (!problem) {
    return <div className="problem-statement">Problem not found</div>;
  }

  return (
    <div className="problem-statement">
      <div className="problem-header-info">
        <h2>{problem.title}</h2>
        <div className="problem-meta">
          <span
            className={`difficulty`}
            style={{
              backgroundColor: getDifficultyColor(problem.difficulty),
            }}
          >
            {problem.difficulty}
          </span>
          <div className="tags">
            {problem.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="problem-content">
        <p>{problem.description}</p>

        <div className="examples">
          <h3>Examples:</h3>
          {problem.examples.map((example, index) => (
            <div key={index} className="example">
              <h4>Example {index + 1}:</h4>
              <div className="example-content">
                <p>
                  <strong>Input:</strong> {example.input}
                </p>
                <p>
                  <strong>Output:</strong> {example.output}
                </p>
                {example.explanation && (
                  <p>
                    <strong>Explanation:</strong> {example.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="constraints">
          <h3>Constraints:</h3>
          <ul>
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>

        {problem.hints && (
          <div className="hints">
            <h3>Hints:</h3>
            <ul>
              {problem.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProblemStatement;
