import "./HomePage.scss";

import ProblemCard from "../components/ProblemCard";
import { useEffect, useMemo, useState } from "react";
import Button from "../ui/Button";
import type { Problem } from "../types";
import { getAllProblems } from "../services/api";
import Loader from "../ui/Loader";

const HomePage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const result = await getAllProblems();
        const problems: Problem[] = result.problems;
        setProblems(problems);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const loadTags = () => {
      const uniqueTags = new Set<string>();

      problems.forEach((problem) => {
        problem.tags.forEach((tag) => {
          uniqueTags.add(tag);
        });
      });
      setTags(Array.from(uniqueTags));
    };

    loadTags();
  }, [problems]);

  const difficulties = ["All", "Easy", "Novice", "Medium", "Hard"];

  const clearFilters = () => {
    setSelectedDifficulty("All");
    setSelectedTag("All");
  };

  // Filter problems based on selected filters
  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        problem.difficulty === selectedDifficulty;
      const matchesTag =
        selectedTag === "All" || problem.tags.includes(selectedTag);
      return matchesDifficulty && matchesTag;
    });
  }, [selectedDifficulty, selectedTag, problems]);

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
            Showing {filteredProblems.length} of {problems.length} problems
          </span>
        </div>
      </div>

      <div className="problems-container">
        {loading ? (
          <Loader />
        ) : filteredProblems.length > 0 ? (
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
