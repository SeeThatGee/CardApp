import { useEffect, useState } from "react";
import "./SwiftyModal.css";
import Winner from "../../../public/sound/Winner.mp3";

export const SwiftyModal = ({
  gameWon,
  guesses,
  time,
  onEntryAdded,
  rearrange,
  isEasy,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (gameWon) {
      const audio = new Audio(Winner);
      audio.play();
    }
  }, [gameWon]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      name,
      guesses,
      time,
      difficulty: isEasy ? "easy" : "hard",
    };

    try {
      const response = await fetch("http://localhost:3001/swifties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("New entry added!");
      onEntryAdded();
      rearrange();
    } catch (error) {
      console.error("Failed to add new entry:", error);
    }
  };

  return (
    <div className="swifty-status">
      {gameWon && (
        <form onSubmit={handleSubmit}>
          <h2>This is the winning era!</h2>
          <div className="enter-name">
            <label>
              Enter Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength="5"
                required
              />
            </label>
          </div>
          <p>Guesses: {guesses}</p>
          <p>Time: {time} seconds</p>
          <button type="submit">Submit Score</button>
        </form>
      )}
    </div>
  );
};
