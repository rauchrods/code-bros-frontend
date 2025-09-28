import { PROBLEMS } from "../constants/problems";
import "./HomePage.scss";

import ProblemCard from "../components/ProblemCard";
import { useMemo, useState } from "react";
import Button from "../ui/Button";

const HomePage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const difficulties = ["All", "Easy", "Novice", "Medium", "Hard"];

  const tags = [
    "All",
    "Array",
    "Binary Search",
    "Divide and Conquer",
    "Dynamic Programming",
    "Greedy",
    "Hash Table",
    "Linked List",
    "Math",
    "Recursion",
    "Sliding Window",
    "String",
    "Two Pointers",
  ];

  const clearFilters = () => {
    setSelectedDifficulty("All");
    setSelectedTag("All");
  };

  // Filter problems based on selected filters
  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((problem) => {
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        problem.difficulty === selectedDifficulty;
      const matchesTag =
        selectedTag === "All" || problem.tags.includes(selectedTag);
      return matchesDifficulty && matchesTag;
    });
  }, [selectedDifficulty, selectedTag]);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Code Editor Problems</h1>
        <p>Choose a problem to start coding</p>
      </header>

      <div className="filters-section">
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="difficulty-filter">Difficulty:</label>
            <select
              id="difficulty-filter"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-dropdown"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="tag-filter">Tag:</label>
            <select
              id="tag-filter"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="filter-dropdown"
            >
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={clearFilters} variant="danger" size="md">
            Clear Filters
          </Button>
        </div>

        <div className="results-info">
          <span className="results-count">
            Showing {filteredProblems.length} of {PROBLEMS.length} problems
          </span>
        </div>
      </div>

      <div className="problems-container">
        {filteredProblems.length > 0 ? (
          <div className="problems-grid">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No problems found</h3>
            <p>Try adjusting your filters to see more results.</p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
