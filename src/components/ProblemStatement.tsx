import { useState } from "react";
import type { Problem } from "../types";
import DifficultyBadge from "../ui/DifficultyBadge";
import "./ProblemStatement.scss";

const renderInput = (input: object): string => {
  let inputString = "";
  Object.entries(input).forEach(([key, value]) => {
    inputString += `${key}: ${JSON.stringify(value)}, `;
  });
  return inputString;
};

const renderOutput = (output: object): string => {
  if (typeof output === "string") {
    return output;
  }
  return JSON.stringify(output);
};

interface ProblemStatementProps {
  problem: Problem | null;
}

const ProblemStatement: React.FC<ProblemStatementProps> = ({ problem }) => {
  const [activeTab, setActiveTab] = useState<"Problem" | "Solution">("Problem");
  if (!problem) {
    return <div className="problem-statement">Problem not found</div>;
  }

  return (
    <div className="problem-statement">
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "Problem" ? "active" : ""}`}
          onClick={() => setActiveTab("Problem")}
        >
          Problem
        </div>
        <div
          className={`tab ${activeTab === "Solution" ? "active" : ""}`}
          onClick={() => setActiveTab("Solution")}
        >
          Solution
        </div>
      </div>

      {activeTab === "Problem" ? (
        <>
          <div className="problem-header-info">
            <h2>{problem.title}</h2>
            <div className="problem-meta">
              <DifficultyBadge difficulty={problem.difficulty} />
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
                      <strong>Input:</strong> {renderInput(example.input)}
                    </p>
                    <div className="example-output">
                      <p>
                        <strong>Output:</strong>
                      </p>
                      <p>{renderOutput(example.output)}</p>
                    </div>
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
        </>
      ) : (
        <iframe
          src={problem.solutionLink ? problem.solutionLink : "https://dsaprep.rauchrodrigues.in/"}
          style={{ width: "100%", height: "80vh", border: "none" }}
        ></iframe>
      )}
    </div>
  );
};
export default ProblemStatement;
