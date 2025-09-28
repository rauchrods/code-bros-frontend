import { PROBLEMS } from "../constants/problems";
import "./HomePage.scss";

import ProblemCard from "../components/ProblemCard";

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
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
