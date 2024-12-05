import "./Swiftyboard.css";
import { useEffect, useState } from "react";

export const Swiftyboard = ({ refresh, isEasy }) => {
  const [fastestSwiftyboard, setFastestSwiftyboard] = useState([]);
  const [fewestGuessesSwiftyboard, setFewestGuessesSwiftyboard] = useState([]);

  useEffect(() => {
    const fetchSwiftyboard = async () => {
      try {
        const response = await fetch("http://localhost:3001/swifties");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter by difficulty
        const filteredData = data.filter(
          (entry) => entry.difficulty === (isEasy ? "easy" : "hard")
        );

        // Sort by fastest time
        const sortedByTime = [...filteredData].sort((a, b) => a.time - b.time);

        // Sort by fewest guesses
        const sortedByGuesses = [...filteredData].sort(
          (a, b) => a.guesses - b.guesses
        );

        setFastestSwiftyboard(sortedByTime);
        setFewestGuessesSwiftyboard(sortedByGuesses);
      } catch (error) {
        console.error("Failed to fetch Swiftyboard:", error);
      }
    };

    fetchSwiftyboard();
  }, [refresh, isEasy]); // Re-fetch when `refresh` or `isEasy` changes

  const getMedal = (index) => {
    if (index === 0) return "💎";
    if (index === 1) return "💖";
    if (index === 2) return "😻";
    return `${index + 1}th`;
  };

  return (
    <div className="Swiftyboards">
      <div className="Swiftyboard">
        <h2>{isEasy ? "Fastest Time" : "🔥Fastest Time"}</h2>
        <ol>
          {fastestSwiftyboard.map((entry, index) => (
            <li key={entry.id}>
              <span>{getMedal(index)}</span>
              <span className="name">{entry.name}</span>
              <span>{entry.time} seconds</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="Swiftyboard">
        <h2>{isEasy ? "Fewest Guesses" : "🔥Fewest Guesses "}</h2>
        <ol>
          {fewestGuessesSwiftyboard.map((entry, index) => (
            <li key={entry.id}>
              <span>{getMedal(index)}</span>
              <span className="name">{entry.name}</span>
              <span>{entry.guesses} guesses</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
