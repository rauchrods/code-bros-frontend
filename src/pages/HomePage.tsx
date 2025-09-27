import { Link } from "react-router-dom";
import { PROBLEMS } from "../constants/problems";
import { getDifficultyColor } from "../utils/difficultyColor";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Code Editor Problems</h1>
        <p>Choose a problem to start coding</p>
      </header>

      <div className="problems-container">
        <div className="problems-grid">
          {PROBLEMS.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="problem-card"
            >
              <div className="problem-header">
                <h3 className="problem-title">{problem.title}</h3>
                <span
                  className="difficulty-badge"
                  style={{
                    backgroundColor: getDifficultyColor(problem.difficulty),
                  }}
                >
                  {problem.difficulty}
                </span>
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
